# serve_model.py

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Load saved model + feature order
bundle = joblib.load("diabetes_rf_model.joblib")
model = bundle["model"]
feature_order = bundle["feature_order"]

app = FastAPI(title="Diabetes Prediction API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # for now, allow any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Patient(BaseModel):
    age: float
    gender: str
    ethnicity: str
    education_level: str
    income_level: str
    employment_status: str
    smoking_status: str
    alcohol_consumption_per_week: float
    physical_activity_minutes_per_week: float
    diet_score: float
    sleep_hours_per_day: float
    screen_time_hours_per_day: float
    family_history_diabetes: float
    hypertension_history: float
    cardiovascular_history: float
    bmi: float
    waist_to_hip_ratio: float
    systolic_bp: float
    diastolic_bp: float
    heart_rate: float
    cholesterol_total: float
    hdl_cholesterol: float
    ldl_cholesterol: float
    triglycerides: float
    glucose_fasting: float
    glucose_postprandial: float
    insulin_level: float
    hba1c: float


@app.post("/predict")
def predict(patient: Patient):
    # Turn input into a DataFrame row in correct column order
    data = patient.dict()
    row = [data[col] for col in feature_order]
    df = pd.DataFrame([row], columns=feature_order)

    proba = float(model.predict_proba(df)[0, 1])   # P(diabetes)
    pred = int(model.predict(df)[0])

    # if you want to force a different threshold later:
    # pred = int(proba >= 0.30)

    return {
        "probability": proba,
        "prediction": pred,
        "label": "Diabetes" if pred == 1 else "No diabetes",
    }
