from fastapi import APIRouter
from pydantic import BaseModel
from src.predict import predict_churn

router = APIRouter()


# ---------------- REQUEST SCHEMA ----------------

class ChurnRequest(BaseModel):
    tenure_months: int
    monthly_charges: float
    total_charges: float
    contract_type: str
    internet_service: str


# ---------------- API ENDPOINT ----------------

@router.post("/predict")
def predict(data: ChurnRequest):
    """
    Predict churn probability and label.
    """
    result = predict_churn(data.dict())
    return result