from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import os

from .schema import Patient, PredictResponse
from .model_loader import load_bundle
from .inference import predict_patient

app = FastAPI(
    title="Diabetes Prediction API",
    version="1.0.0"
)

allowed_origins = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:8080").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model, feature_order = load_bundle()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictResponse)
def predict(patient: Patient):
    return predict_patient(patient, model, feature_order)