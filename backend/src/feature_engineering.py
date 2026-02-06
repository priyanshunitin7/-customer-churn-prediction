import pandas as pd


def add_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Business-driven feature engineering for Telco churn dataset.
    Safe for real-world categorical values.
    """

    df = df.copy()

    # --- Average Monthly Spend ---
    if "Total Charges" in df.columns and "Tenure Months" in df.columns:
        df["Total Charges"] = pd.to_numeric(df["Total Charges"], errors="coerce")
        df["AvgMonthlySpend"] = (
            df["Total Charges"] / df["Tenure Months"].replace(0, 1)
        )

    # --- Long-term Contract Indicator ---
    if "Contract" in df.columns:
        df["IsLongTermContract"] = df["Contract"].isin(
            ["One year", "Two year"]
        ).astype(int)

    # --- Senior Citizen Mapping (FIXED) ---
    if "Senior Citizen" in df.columns:
        df["Senior Citizen"] = df["Senior Citizen"].map(
            {"Yes": 1, "No": 0}
        )

    return df