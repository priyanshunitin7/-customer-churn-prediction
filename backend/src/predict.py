import os
import joblib
import pandas as pd

# ---------------- CONFIG ----------------

MODEL_PATH = os.path.join("models", "churn_pipeline.pkl")

# Business-driven churn threshold
# Lowered from 0.5 because churn datasets are imbalanced
CHURN_THRESHOLD = 0.4

# ---------------- LOAD MODEL ----------------

pipeline = joblib.load(MODEL_PATH)

# ---------------- PREDICTION FUNCTION ----------------

def predict_churn(data: dict):
    """
    Predict churn probability and label
    using the trained sklearn Pipeline.
    """

    # Build input dataframe exactly as training expected
    df = pd.DataFrame([{
        "Tenure Months": data["tenure_months"],
        "Monthly Charges": data["monthly_charges"],
        "Total Charges": data["total_charges"],
        "Contract": data["contract_type"],
        "Internet Service": data["internet_service"],
    }])

    # Predict probability
    churn_probability = pipeline.predict_proba(df)[0][1]

    # Apply business threshold
    churn_label = int(churn_probability >= CHURN_THRESHOLD)

    return {
        "churn_probability": float(churn_probability),
        "churn_label": churn_label,
        "threshold_used": CHURN_THRESHOLD
    }