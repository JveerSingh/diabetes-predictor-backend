# Diabetes Predictor – Full-Stack Microservice

## Goal
Turn my current diabetes prediction backend into a containerized, microservice-lite, enterprise-style full-stack app: an Angular UI calls a Spring Boot REST API, which validates input and orchestrates calls to a Python (FastAPI) model microservice for inference, and (later) adds an AI explanation endpoint. The end result should be runnable locally with one command (`docker compose up`), have clean JSON contracts, basic tests, Swagger/OpenAPI docs, and a polished README.

---

## Checklist (Speedrun)

### Phase 0 — Repo Structure
- [ ] Create folders: `model-service-python/`, `backend-springboot/`, `frontend-angular/`, `infra/`
- [ ] Move existing Python model assets into `model-service-python/`
- [ ] Add `.env.example` and keep secrets out of git

### Phase 1 — Python Model Microservice (FastAPI)
- [ ] FastAPI app with:
  - [ ] `GET /health`
  - [ ] `POST /predict`
- [ ] Request/response schemas (Pydantic)
- [ ] Load model once at startup; inference is a pure function
- [ ] Dockerfile + requirements.txt
- [ ] Local test via curl

### Phase 2 — Spring Boot Orchestrator API (Java)
- [ ] Spring Boot app with:
  - [ ] `GET /api/v1/health`
  - [ ] `POST /api/v1/predict` (calls Python service)
- [ ] DTOs + input validation (`@Valid`)
- [ ] Service layer + HTTP client layer (`ModelClient`)
- [ ] Global error handling (`@ControllerAdvice`)
- [ ] Logging + requestId
- [ ] Swagger/OpenAPI docs
- [ ] Basic unit tests

### Phase 3 — Angular Frontend
- [ ] Angular app with:
  - [ ] Input form for health features
  - [ ] Results view (prediction + probability)
  - [ ] API service for HTTP calls
  - [ ] Basic routing

### Phase 4 — Docker Compose
- [ ] `infra/docker-compose.yml` runs:
  - [ ] `model-service` (FastAPI)
  - [ ] `backend` (Spring Boot)
  - [ ] `frontend` (Angular)
- [ ] Frontend → Backend → Model service works end-to-end

### Phase 5 — AI Explainability (Optional but High Value)
- [ ] `POST /api/v1/explain` returns a natural-language explanation
- [ ] Add prompt safety + “not medical advice” disclaimer
- [ ] Show explanation in UI

### Phase 6 — Polish
- [ ] Architecture diagram (ASCII is fine)
- [ ] API examples (curl)
- [ ] Demo steps + screenshots (optional)
- [ ] Resume bullets + interview talking points

---

## Target API Contracts (Draft)

### Predict (Frontend → Spring)
`POST /api/v1/predict`
```json
{
  "pregnancies": 2,
  "glucose": 140,
  "bloodPressure": 85,
  "skinThickness": 20,
  "insulin": 90,
  "bmi": 32.4,
  "diabetesPedigreeFunction": 0.52,
  "age": 45
}