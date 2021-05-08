import logging
from dataclasses import dataclass
from typing import List

from fseval.base import ConfigurableEstimator
from fseval.config import ValidatorConfig
from sklearn.feature_selection import SelectKBest

logger = logging.getLogger(__name__)


@dataclass
class Validator(ValidatorConfig, ConfigurableEstimator):
    """
    Validation estimator. Can have both a classifier and a regressor defined: the
    correct type will automatically be chosen according to the dataset task.
    """

    def select_fit_score(
        self,
        X_train: List,
        X_test: List,
        y_train: List,
        y_test: List,
        ranking: List,
        k: int,
    ):
        # select
        selector = SelectKBest(score_func=lambda *_: ranking, k=k)
        X_train_selected = selector.fit_transform(X_train, y_train)
        X_test_selected = selector.fit_transform(X_test, y_test)

        # fit
        self.fit(X_train_selected, y_train)

        # score
        # FIXME do not rely on `score`, explicitly use accuracy or r2 manually.
        score = self.score(X_test_selected, y_test)
        logger.info(f"{self.task.name} {self.name} score: {score} (p={k})")
        return score
