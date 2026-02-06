from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import router

app = FastAPI(title="Customer Churn Prediction API")

# allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # restrict later
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {"status": "API is running"}