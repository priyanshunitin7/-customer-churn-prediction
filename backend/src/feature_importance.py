import pandas as pd
import matplotlib.pyplot as plt


def show_feature_importance(model, feature_names, top_n=15):
    """
    Display top N important features from a tree-based model.
    """

    importance = pd.Series(
        model.feature_importances_,
        index=feature_names
    ).sort_values(ascending=False)

    print("\nTop Important Features:")
    print(importance.head(top_n))

    importance.head(top_n).plot(kind="barh", figsize=(8, 6))
    plt.gca().invert_yaxis()
    plt.title("Top Feature Importances")
    plt.xlabel("Importance Score")
    plt.tight_layout()
    plt.savefig("feature_importance.png")
    plt.close()