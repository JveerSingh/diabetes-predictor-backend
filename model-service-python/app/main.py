from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI



app = FastAPI(title="Diabetes Prediction API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # for now, allow any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)