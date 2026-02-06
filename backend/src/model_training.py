import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
import joblib
import os


DATA_PATH = "data/raw/Telco_customer_churn.xlsx"
MODEL_DIR = "models"
MODEL_PATH = os.path.join(MODEL_DIR, "churn_pipeline.pkl")


def train_model():
    print("📥 Loading dataset...")
    df = pd.read_excel(DATA_PATH)

    print("🧹 Selecting features...")
    features = [
        "Tenure Months",
        "Monthly Charges",
        "Total Charges",
        "Contract",
        "Internet Service"
    ]

    target = "Churn Value"

    df = df[features + [target]]

    df["Total Charges"] = pd.to_numeric(df["Total Charges"], errors="coerce")
    df = df.dropna()

    X = df[features]
    y = df[target]

    num_features = [
        "Tenure Months",
        "Monthly Charges",
        "Total Charges"
    ]

    cat_features = [
        "Contract",
        "Internet Service"
    ]

    print("🧠 Building preprocessing pipeline...")
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), num_features),
            ("cat", OneHotEncoder(handle_unknown="ignore"), cat_features)
        ]
    )

    print("🌲 Building model pipeline...")
    pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("model", RandomForestClassifier(
                n_estimators=300,
                max_depth=12,
                random_state=42,
                n_jobs=-1
            ))
        ]
    )

    print("📊 Training model...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    pipeline.fit(X_train, y_train)

    preds = pipeline.predict_proba(X_test)[:, 1]
    auc = roc_auc_score(y_test, preds)

    print(f"✅ ROC-AUC: {auc:.4f}")

    print("💾 Saving pipeline...")
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(pipeline, MODEL_PATH)

    print("🎉 Training complete. Pipeline saved.")


if __name__ == "__main__":
    train_model()