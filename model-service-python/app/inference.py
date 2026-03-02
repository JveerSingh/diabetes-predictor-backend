from schema import Patient, PredictResponse
import pandas as pd

def predict_patient(patient: Patient, model, feature_order) -> PredictResponse:
    data = patient.model_dump()

    row = [data[col] for col in feature_order]
    df = pd.DataFrame([row], columns=feature_order)

    proba = float(model.predict_proba(df)[0, 1]) 
    pred = int(model.predict(df)[0])

    label = "Diabetes" if pred == 1 else "No diabetes"
    return PredictResponse(probability=proba, prediction=pred,label=label)
