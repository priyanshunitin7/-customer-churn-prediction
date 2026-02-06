import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler


def load_data(file_path: str) -> pd.DataFrame:
    """
    Load Telco churn dataset from Excel.
    """
    return pd.read_excel(file_path)


def preprocess_data(df: pd.DataFrame, target_column: str):
    """
    Clean, encode, scale, and split the Telco churn dataset.
    Returns:
    X_train, X_test, y_train, y_test, feature_names, scaler
    """

    # Separate features and target
    X = df.drop(columns=[target_column])
    y = df[target_column]

    # Drop non-predictive / leakage columns
    drop_cols = [
        "CustomerID", "Count", "Country", "State", "City",
        "Zip Code", "Lat Long", "Latitude", "Longitude",
        "Churn Label", "Churn Reason", "Churn Score"
    ]
    X = X.drop(columns=[c for c in drop_cols if c in X.columns])

    # Ensure numeric conversion
    if "Total Charges" in X.columns:
        X["Total Charges"] = pd.to_numeric(
            X["Total Charges"], errors="coerce"
        )

    # Identify columns
    num_cols = X.select_dtypes(include="number").columns
    cat_cols = X.select_dtypes(include="object").columns

    # Imputation
    num_imputer = SimpleImputer(strategy="median")
    cat_imputer = SimpleImputer(strategy="most_frequent")

    X[num_cols] = num_imputer.fit_transform(X[num_cols])
    X[cat_cols] = cat_imputer.fit_transform(X[cat_cols])

    # One-hot encoding
    X = pd.get_dummies(X, drop_first=True)

    # Save feature order BEFORE scaling
    feature_names = X.columns.tolist()

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    # Scaling
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test, feature_names, scaler