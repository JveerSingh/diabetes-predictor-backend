export interface PatientRequest {
  age: number;
  gender: string;
  ethnicity: string;
  education_level: string;
  income_level: string;
  employment_status: string;
  smoking_status: string;
  alcohol_consumption_per_week: number;
  physical_activity_minutes_per_week: number;
  diet_score: number;
  sleep_hours_per_day: number;
  screen_time_hours_per_day: number;
  family_history_diabetes: number;
  hypertension_history: number;
  cardiovascular_history: number;
  bmi: number;
  waist_to_hip_ratio: number;
  systolic_bp: number;
  diastolic_bp: number;
  heart_rate: number;
  cholesterol_total: number;
  hdl_cholesterol: number;
  ldl_cholesterol: number;
  triglycerides: number;
  glucose_fasting: number;
  glucose_postprandial: number;
  insulin_level: number;
  hba1c: number;
}

export interface PredictResponse {
  probability: number;
  prediction: number;
  label: string;
}