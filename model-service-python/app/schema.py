from pydantic import BaseModel

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

class PredictResponse(BaseModel):
    probability: float
    prediction: int
    label: str
