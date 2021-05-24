import logging
import re
from dataclasses import dataclass
from itertools import chain
from typing import Any, Dict, Optional, Tuple, Union

import numpy as np
from fseval.types import AbstractAdapter, IncompatibilityError, Task
from hydra.core.config_store import ConfigStore
from hydra.utils import instantiate
from omegaconf import II, MISSING, DictConfig, OmegaConf
from sklearn.preprocessing import minmax_scale

logger = logging.getLogger(__name__)


@dataclass
class DatasetConfig:
    """
    Args:
        name: human-readable name of dataset.

        group: an optional group attribute, such to group datasets in the analytics
        stage.

        task: either Task.classification or Task.regression.

        domain: dataset domain, e.g. medicine, finance, etc.

        adapter: dataset adapter. must be of fseval.adapters.Adapter type, i.e. must
        implement a get_data() -> (X, y) method.

        adapter_callable: adapter class callable. the function to be called on the
        instantiated class to fetch the data (X, y). is ignored when the target itself
        is a function callable.

        feature_importances: weightings indicating relevant features or instances.
        should be a dict with each key and value like the following pattern:
            X[<numpy selector>] = <float>
        Example:
            X[:, 0:3] = 1.0
        which sets the 0-3 features as maximally relevant and all others
        minimally relevant.
    """

    _target_: str = "fseval.pipeline.dataset.DatasetLoader"
    _recursive_: bool = False  # prevent adapter from getting initialized
    name: str = MISSING
    task: Task = MISSING
    adapter: Any = MISSING
    adapter_callable: str = "get_data"
    feature_importances: Optional[Dict[str, float]] = None
    # optional tags
    group: Optional[str] = None
    domain: Optional[str] = None


@dataclass
class Dataset:
    X: np.ndarray
    y: np.ndarray
    n: int
    p: int
    multioutput: bool
    feature_importances: Optional[np.ndarray] = None


@dataclass
class DatasetLoader(DatasetConfig):
    def _get_adapter(self) -> Union[object, tuple]:
        if OmegaConf.is_dict(self.adapter):
            adapter = instantiate(self.adapter)
            return adapter
        elif callable(self.adapter):
            return self.adapter()
        elif isinstance(self.adapter, object):
            adapter = self.adapter
            return adapter
        else:
            raise ValueError(f"Incorrect adapter type: got {type(self.adapter)}.")

    def _get_adapter_data(self) -> Tuple:
        adapter = self._get_adapter()
        if isinstance(adapter, tuple):
            data = adapter
            msg = f"adapter callable `{self._target_}`"
            assert (
                len(data) == 2
            ), f"{msg} must return tuple of length 2 (got {len(data)})."
            X, y = data
            return X, y
        else:
            funcname = self.adapter_callable
            msg = f"adapter class `{self._target_}` function `{funcname}`"
            assert hasattr(adapter, funcname), f"{msg} does not exist."

            get_data_func = getattr(adapter, funcname)
            assert callable(get_data_func), f"{msg} is not callable."

            data = get_data_func()
            assert isinstance(data, tuple), f"{msg} did not return a tuple (X, y)."

            assert (
                len(data) == 2
            ), f"{msg} must return tuple of length 2 (got {len(data)})."
            X, y = data
            return X, y

    def get_feature_importances(
        self, X: np.ndarray, n: int, p: int
    ) -> Optional[np.ndarray]:
        if self.feature_importances is None:
            return None
        assert OmegaConf.is_dict(self.feature_importances) or isinstance(
            self.feature_importances, dict
        ), """dataset `feature_importances` ground truth must be a dict."""

        # make variables accessible in current context
        X = np.zeros_like(X)

        # process feature importances
        for selector, value in self.feature_importances.items():
            assert (
                re.match(r"X\[.*\]", selector) is not None
            ), f"incorrect feature_importances pattern: {selector} = {value}"

            exec(f"{selector} = {value}")

        # normalize to make every row a probability vector
        row_sums = X.sum(axis=1)
        X = X / row_sums[:, np.newaxis]

        if np.isclose(X, X[0]).all():  # all rows are equal
            return X[0]  # return first row
        else:
            raise IncompatibilityError("instance-based datasets not supported yet.")

            return X  # return entire matrix

    def load(self) -> Dataset:
        X, y = self._get_adapter_data()

        X = np.asarray(X)
        y = np.asarray(y)
        n = X.shape[0]
        p = X.shape[1]
        multioutput = y.ndim > 1
        feature_importances = self.get_feature_importances(X, n, p)

        task_name = self.task.name if hasattr(self.task, "name") else self.task
        logger.info(f"loaded {self.name} {task_name} dataset (n={n}, p={p})")

        dataset = Dataset(X, y, n, p, multioutput, feature_importances)
        return dataset
