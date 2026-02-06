from fastapi import APIRouter, HTTPException
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

@router.post(
    "/predict",
    tags=["Churn Prediction"],
    summary="Predict customer churn probability",
)
def predict(data: ChurnRequest):
    """
    Predict churn probability and churn label
    using the trained ML pipeline.
    """
    try:
        result = predict_churn(data.dict())
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )