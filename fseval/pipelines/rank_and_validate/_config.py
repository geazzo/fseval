import logging
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Dict, List

import numpy as np
import pandas as pd
from fseval.pipeline.cv import CrossValidator
from fseval.pipeline.dataset import Dataset, DatasetConfig
from fseval.pipeline.estimator import Estimator, TaskedEstimatorConfig
from fseval.pipeline.resample import Resample, ResampleConfig
from fseval.types import AbstractEstimator, Callback, Task
from hydra.core.config_store import ConfigStore
from hydra.utils import instantiate
from omegaconf import II, MISSING
from sklearn.base import BaseEstimator, clone
from sklearn.ensemble import VotingClassifier, VotingRegressor
from sklearn.ensemble._base import _BaseHeterogeneousEnsemble
from sklearn.feature_selection import SelectFromModel, SelectKBest
from sklearn.metrics import log_loss, r2_score
from sklearn.preprocessing import MinMaxScaler
from sklearn.utils import _print_elapsed_time
from sklearn.utils.metaestimators import _BaseComposition
from tqdm import tqdm

from .._experiment import Experiment
from ._ranker import Ranker, RankerConfig

logger = logging.getLogger(__name__)


@dataclass
class RankAndValidateConfig:
    _target_: str = "fseval.pipelines.rank_and_validate._components.RankAndValidate"
    name: str = "rank-and-validate"
    resample: ResampleConfig = MISSING
    ranker: RankerConfig = MISSING  # CLI: estimator@pipeline.ranker=chi2
    validator: TaskedEstimatorConfig = MISSING  # CLI: estimator@pipeline.ranker=chi2
    n_bootstraps: int = MISSING
