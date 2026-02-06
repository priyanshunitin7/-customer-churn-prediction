import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

os.makedirs(MODEL_DIR, exist_ok=True)

def save_artifacts(model, scaler, feature_names):
    joblib.dump(model, os.path.join(MODEL_DIR, "churn_model.pkl"))
    joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
    joblib.dump(feature_names, os.path.join(MODEL_DIR, "feature_names.pkl"))