from typing import Tuple, Any, List
import joblib

def load_bundle(model_path: str = "diabetes_rf_model.joblib") -> Tuple[Any, List[str]]:
    """Load the trained model bundle and return (model, feature_order)."""
    bundle = joblib.load(model_path)
    model = bundle["model"]
    feature_order = bundle["feature_order"]
    return model, feature_order