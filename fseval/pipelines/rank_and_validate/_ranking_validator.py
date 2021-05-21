from abc import ABC, abstractmethod
from dataclasses import dataclass
from logging import Logger, getLogger
from typing import Any, Dict, List, Optional

import numpy as np
import pandas as pd
from fseval.pipeline.cv import CrossValidator
from fseval.pipeline.dataset import Dataset, DatasetConfig
from fseval.pipeline.estimator import Estimator, TaskedEstimatorConfig
from fseval.pipeline.resample import Resample, ResampleConfig
from fseval.types import AbstractEstimator, Task
from hydra.core.config_store import ConfigStore
from hydra.utils import instantiate
from omegaconf import II, MISSING
from sklearn.base import BaseEstimator, clone
from sklearn.ensemble import VotingClassifier, VotingRegressor
from sklearn.ensemble._base import _BaseHeterogeneousEnsemble
from sklearn.feature_selection import SelectFromModel, SelectKBest
from sklearn.metrics import log_loss, r2_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
from sklearn.utils import _print_elapsed_time
from sklearn.utils.metaestimators import _BaseComposition
from tqdm import tqdm

from .._experiment import Experiment
from ._config import RankAndValidatePipeline


@dataclass
class RankingValidator(Experiment, RankAndValidatePipeline):
    bootstrap_state: int = MISSING

    logger: Logger = getLogger(__name__)

    def _get_estimator(self):
        yield self.ranker

    def fit(self, X, y):
        override = f"bootstrap_state={self.bootstrap_state}"
        filename = f"ranking[{override}].cloudpickle"
        restored = self.storage_provider.restore_pickle(filename)

        if restored:
            self.ranker.estimator = restored
            self.logger.info("restored ranking from storage provider ✓")
        else:
            super(RankingValidator, self).fit(X, y)
            self.storage_provider.save_pickle(filename, self.ranker.estimator)

    def score(self, X, y):
        X_importances = self.dataset.feature_importances
        if X_importances is None:
            return pd.DataFrame()  # no ground-truth available: don't score ranking

        assert np.ndim(X_importances) == 1, "instance-based not supported yet."
        ranking = self.feature_importances_

        # mean absolute error
        y_true = X_importances
        y_pred = ranking
        r2 = r2_score(y_true, y_pred)

        # log loss
        y_true = X_importances > 0
        y_pred = ranking
        log_loss_score = log_loss(y_true, y_pred, labels=[0, 1])

        scores = pd.DataFrame(
            [
                {
                    "r2_score": r2,
                    "log_loss": log_loss_score,
                    "fit_time": self.ranker.fit_time_,
                    "bootstrap_state": self.bootstrap_state,
                }
            ]
        )
        self.callbacks.on_metrics(scores)
        return scores

    @property
    def feature_importances_(self):
        """Normalized ranker feature importance score. Uses cached ranking if
        available."""
        # normalize and return ranking
        ranking = self.ranker.feature_importances_
        summation = sum(ranking)
        return np.asarray(ranking) / summation
