# Diabetes Predictor – Full Stack Microservice

This project is a full-stack machine learning application built using a small microservice architecture. The goal was to take a trained ML model and expose it through a clean API that can be used by other services or a frontend application.

The system is split into two backend services:

- **FastAPI (Python)** – hosts the trained machine learning model and performs predictions  
- **Spring Boot (Java)** – acts as the main API layer and communicates with the model service  

The backend API receives patient health data, sends it to the model service, and returns a prediction result.

This setup mirrors how many production ML systems are deployed — the model runs in its own service and the main backend interacts with it over HTTP.

---

## Architecture

```
Frontend (Angular – planned)
        ↓
Spring Boot REST API
        ↓
FastAPI Model Service
        ↓
Random Forest ML Model
```

Spring Boot handles API requests and forwards prediction requests to the Python service.  
FastAPI loads the trained model and returns prediction results.

---

## Current Status

✔ Machine learning model trained and serialized (`.joblib`)  
✔ FastAPI model service implemented  
✔ Spring Boot backend API implemented  
✔ Spring Boot successfully calling the FastAPI prediction endpoint  
✔ REST endpoints tested locally  

Planned next steps:

- Angular frontend for user input and prediction display  
- Docker containers for each service  
- Docker Compose for local deployment  

---

## Project Structure

```
diabetes-predictor-backend
│
├── model-service-python
│   ├── app
│   │   ├── main.py
│   │   ├── inference.py
│   │   ├── model_loader.py
│   │   └── schema.py
│   │
│   └── artifacts
│       └── diabetes_rf_model.joblib
│
├── backend-springboot
│   └── demo
│       └── src/main/java/com/example/demo
│           ├── api
│           ├── dto
│           └── service
│
├── frontend-angular (planned)
└── infra (planned)
```

---

## API Endpoints

### Spring Boot Backend

Health check

```
GET /api/v1/health
```

Prediction endpoint

```
POST /api/v1/predict
```

---

## Example Request

```
POST /api/v1/predict
```

```json
{
  "age": 45,
  "gender": "Male",
  "ethnicity": "White",
  "education_level": "Bachelor",
  "income_level": "Medium",
  "employment_status": "Employed",
  "smoking_status": "Never",
  "bmi": 28,
  "glucose_fasting": 95,
  "hba1c": 5.5
}
```

Example response:

```json
{
  "probability": 0.23,
  "prediction": 0,
  "label": "No diabetes"
}
```

---

## Running Locally

Start the model service:

```
cd model-service-python
python -m uvicorn app.main:app --reload
```

The FastAPI service will run on:

```
http://localhost:8000
```

Start the Spring Boot backend:

```
cd backend-springboot/demo
./mvnw spring-boot:run
```

The backend API will run on:

```
http://localhost:8080
```

---

## Why I Built This

The goal of this project was to practice integrating machine learning models into a real backend system rather than keeping them in notebooks or standalone scripts.

Instead of embedding the model directly inside the main backend, the model runs as its own service. This approach keeps the architecture flexible and mirrors how ML systems are often deployed in production environments.