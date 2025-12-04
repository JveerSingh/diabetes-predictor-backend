# train_model.py

import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


def main():
    # 1. Load the dataset
    df = pd.read_csv("diabetes_dataset(in).csv")

    # Target column: 0 = no diabetes, 1 = diabetes
    target = "diagnosed_diabetes"
    y = df[target]

    # Drop target + columns that leak the answer
    X = df.drop(
        columns=[
            "diagnosed_diabetes",   # the label
            "diabetes_risk_score",  # derived score
            "diabetes_stage",       # essentially the diagnosis
        ]
    )

    # 2. Identify numeric and categorical columns
    num_cols = X.select_dtypes(include=[np.number]).columns.tolist()
    cat_cols = X.select_dtypes(exclude=[np.number]).columns.tolist()

    print("Numeric columns:", num_cols)
    print("Categorical columns:", cat_cols)
    print()

    # 3. Preprocessing pipeline
    numeric_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(handle_unknown="ignore")

    preprocess = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, num_cols),
            ("cat", categorical_transformer, cat_cols),
        ]
    )

    # 4. Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    # 5. Random Forest model
    clf = RandomForestClassifier(
        n_estimators=300,
        max_depth=8,
        min_samples_split=20,
        min_samples_leaf=10,
        n_jobs=-1,
        random_state=42,
    )

    model = Pipeline(
        steps=[
            ("preprocess", preprocess),
            ("clf", clf),
        ]
    )

    # 6. Fit the model
    model.fit(X_train, y_train)

    # 7. Basic evaluation
    print("=== Random Forest: default .predict() (threshold = 0.50) ===")
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {acc:.4f}")
    print("Confusion matrix (rows = true, cols = pred):")
    print(confusion_matrix(y_test, y_pred))
    print("\nClassification report:")
    print(classification_report(y_test, y_pred, digits=4))

    # 8. Save model + feature order for serving
    bundle = {
        "model": model,
        "feature_order": X.columns.tolist(),  # important for inference
    }
    joblib.dump(bundle, "diabetes_rf_model.joblib")
    print("\nSaved trained model to diabetes_rf_model.joblib")


if __name__ == "__main__":
    main()
