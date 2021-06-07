from dataclasses import dataclass
from logging import Logger, getLogger

import numpy as np
import pandas as pd
from fseval.types import IncompatibilityError
from omegaconf import MISSING
from sklearn.metrics import log_loss, r2_score

from .._experiment import Experiment
from ._config import RankAndValidatePipeline


@dataclass
class RankingValidator(Experiment, RankAndValidatePipeline):
    bootstrap_state: int = MISSING

    logger: Logger = getLogger(__name__)

    def __post_init__(self):
        if not (
            self.ranker.estimates_feature_importances
            or self.ranker.estimates_feature_ranking
            or self.ranker.estimates_feature_support
        ):
            raise IncompatibilityError(
                f"{self.ranker.name} performs no form of feature ranking: "
                + "this estimator cannot be used as a ranker."
            )

        super(RankingValidator, self).__post_init__()

    @property
    def _cache_filename(self):
        override = f"bootstrap_state={self.bootstrap_state}"
        filename = f"ranking[{override}].pickle"

        return filename

    def _get_estimator(self):
        yield self.ranker

    def prefit(self):
        self.ranker._load_cache(self._cache_filename, self.storage_provider)

    def fit(self, X, y):
        super(RankingValidator, self).fit(X, y)

    def postfit(self):
        self.ranker._save_cache(self._cache_filename, self.storage_provider)

    def score(self, X, y):
        """Scores a feature ranker, if a ground-truth on the desired dataset
        feature importances is available. If this is the case, the estimated normalized
        feature importances are compared to the desired ones using two metrics:
        log loss and the R^2 score. Whilst the log loss converts the ground-truth
        desired feature rankings to a binary value, 0/1, the R^2 score always works."""

        score = {
            "fit_time": self.ranker.fit_time_,
            "bootstrap_state": self.bootstrap_state,
        }

        X_importances = self.dataset.feature_importances
        if X_importances is not None and self.ranker.estimates_feature_importances:
            assert np.ndim(X_importances) == 1, "instance-based not supported yet."

            # predicted feature importances: normalized ranker scores.
            y_pred = np.asarray(self.ranker.feature_importances_)
            y_pred = y_pred / sum(y_pred)

            # r2 score
            y_true = X_importances
            score["r2_score"] = r2_score(y_true, y_pred)

            # log loss
            y_true = X_importances > 0
            score["log_loss"] = log_loss(y_true, y_pred, labels=[0, 1])

        if X_importances is not None and self.ranker.estimates_feature_support:
            ...

        if X_importances is not None and self.ranker.estimates_feature_ranking:
            ...

        # put a in a dataframe so can be easily merged with other pipeline scores
        scores = pd.DataFrame([score])
        return scores
