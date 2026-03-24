# Diabetes Risk Predictor

Diabetes Risk Predictor is a full-stack machine learning application for estimating diabetes risk from patient demographic, lifestyle, medical history, biometric, and laboratory data.

The goal of this project is to make a prediction model usable inside a real application instead of leaving it isolated in a notebook. It combines a frontend, an API layer, and a separate inference service into one working system.

## Overview

The application is split into three parts:

- **Angular frontend** for collecting patient information and displaying results
- **Spring Boot API** for request handling and orchestration
- **FastAPI model service** for machine learning inference

A user submits patient data through the frontend, the request is sent to the Spring Boot backend, the backend forwards it to the FastAPI model service, and the prediction result is returned to the UI.

## Why this project exists

This project was built to explore what it looks like to move from a trained model to a usable application.

Instead of focusing only on model training, it focuses on the system around the model:
- a user-facing interface
- a backend API boundary
- a dedicated inference service
- communication between Java and Python services

## Architecture


Angular Frontend
↓
Spring Boot REST API
↓
FastAPI Model Service
↓
Machine Learning Model


## How it works

1. A user enters patient information in the Angular frontend
2. The frontend sends the request to the Spring Boot API
3. Spring Boot processes the request and communicates with the FastAPI model service
4. The model service performs inference and returns the result
5. The backend sends the final response back to the frontend
6. The frontend displays the predicted risk and probability

## Features

- End-to-end diabetes risk prediction flow
- Structured patient input form in Angular
- Spring Boot REST API for backend orchestration
- FastAPI model service for inference
- Separation between frontend, backend, and model logic
- Local multi-service development setup
- Health check endpoint for backend verification

## Tech Stack

### Frontend
- Angular
- TypeScript
- HTML/CSS
- Reactive Forms

### Backend
- Spring Boot
- Java
- REST APIs

### Model Service
- FastAPI
- Python
- scikit-learn
- joblib

## Project Structure


diabetes-predictor-backend/
├── frontend-angular/
├── backend-springboot/
│ └── demo/
├── model-service-python/
├── README.md
└── .gitignore


## API Endpoints

### Spring Boot API

**Health check**
```http
GET /api/v1/health

Prediction

POST /api/v1/predict
Example Request
{
  "age": 45,
  "gender": "Male",
  "ethnicity": "White",
  "education_level": "Bachelor",
  "income_level": "Medium",
  "employment_status": "Employed",
  "smoking_status": "Never",
  "alcohol_consumption_per_week": 2,
  "physical_activity_minutes_per_week": 180,
  "diet_score": 7,
  "sleep_hours_per_day": 7,
  "screen_time_hours_per_day": 6,
  "family_history_diabetes": 0,
  "hypertension_history": 0,
  "cardiovascular_history": 0,
  "bmi": 28,
  "waist_to_hip_ratio": 0.9,
  "systolic_bp": 120,
  "diastolic_bp": 80,
  "heart_rate": 72,
  "cholesterol_total": 190,
  "hdl_cholesterol": 52,
  "ldl_cholesterol": 110,
  "triglycerides": 140,
  "glucose_fasting": 95,
  "glucose_postprandial": 130,
  "insulin_level": 12,
  "hba1c": 5.5
}
Example Response
{
  "probability": 0.23,
  "prediction": 0,
  "label": "No diabetes"
}
Running Locally
1. Start the FastAPI model service
cd model-service-python
python -m uvicorn app.main:app --reload

Runs on:

http://localhost:8000
2. Start the Spring Boot backend
cd backend-springboot/demo
./mvnw spring-boot:run

Runs on:

http://localhost:8080
3. Start the Angular frontend
cd frontend-angular
ng serve

Runs on:

http://localhost:4200
Current Status
Angular frontend implemented
Spring Boot backend implemented
FastAPI model service implemented
End-to-end prediction flow working locally
Frontend connected to the backend prediction endpoint
Ready for deployment and further polish
