from pathlib import Path
import joblib
from typing import Any, List, Tuple

def load_bundle() -> Tuple[Any, List[str]]:
    model_path = Path(__file__).resolve().parents[1] / "artifacts" / "diabetes_rf_model.joblib"
    bundle = joblib.load(model_path)
    return bundle["model"], bundle["feature_order"]