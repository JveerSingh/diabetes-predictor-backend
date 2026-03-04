import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('diabetes_dataset(in).csv')

# --- Training an AI Model ---

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

# Define X and y
target = "diagnosed_diabetes"
X = df.drop(columns=[target])
y = df[target]

# Identify numeric and categorical columns
num_cols = X.select_dtypes(include=[np.number]).columns
cat_cols = X.select_dtypes(exclude=[np.number]).columns


# Preprocessing: scale numerics, one-hot encode categoricals
preprocess = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), num_cols),
        ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols)
    ]
)

# --- Model pipeline ---
model = Pipeline(steps=[
    ("preprocess", preprocess),
    ("clf", LogisticRegression(max_iter=1000))
])

# --- Train/test split ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# --- Train model ---
model.fit(X_train, y_train)

print("Test accuracy:", model.score(X_test, y_test))


#print(df.head())
#print(df['age'].max())
#print(df['age'].min())
#print(df['age'].nunique())
#print(df['diagnosed_diabetes'])
agg = df.groupby("age")["diagnosed_diabetes"].agg(total_diagnosed="sum", total_records="count").reset_index()
agg["incidence"] = agg["total_diagnosed"] / agg["total_records"]
m, b = np.polyfit(agg["age"], agg["incidence"], 1)
plt.plot(agg["age"], m*agg["age"] + b, color="red", label="Best Fit Line")
plt.scatter(agg["age"], agg["incidence"])
plt.xlabel("Age")
plt.ylabel("Diabetes Incidence (0–1)")
plt.title("Diabetes Incidence by Age")
plt.grid(True)
plt.show()
columns = df.columns.tolist()
user_input = input("Enter a category:")
if user_input in columns:
    print(f"Category '{user_input}' exists in the CSV.")
else:
    print(f"Category '{user_input}' is NOT in the CSV.")
target = "diagnosed_diabetes"

print("Available categories:")
for col in columns:
    print("-", col)

print("\n")

# --- Step 1: Ask for a category ---
while True:
    category = input("Choose a category from the list above: ").strip()

    if category in columns:
        print(f"✓ Category '{category}' exists.")
        break
    else:
        print(f"✗ Category '{category}' does NOT exist in the CSV. Please try again.\n")


# --- Step 2: Ask for a value within that category ---
valid_values = df[category].unique()   # all unique values in that column

print(f"\nValid values in '{category}':")
print(valid_values)
print("\n")

while True:
    value = input(f"Enter a value for category '{category}': ").strip()

    # Try to convert to number if possible
    try:
        numeric_value = float(value)
        value_to_check = numeric_value
    except ValueError:
        value_to_check = value  # keep as string

    # check if value is in unique values
    if value_to_check in valid_values:
        print(f"✓ Value '{value}' exists in category '{category}'.")
        break
    else:
        print(f"✗ Value '{value}' does NOT exist in the CSV for that category.")
        print("   The system cannot make a prediction with unseen data.")
        print("   Please enter a different value.\n")

print("\nAll inputs are valid. You may now proceed to prediction.")

sample = X.iloc[[0]].copy()
sample[category] = value_to_check

proba = model.predict_proba(sample)[0, 1]
pred_class = model.predict(sample)[0]

print(f"Predicted probability of diabetes: {proba:.2%}")
print("Predicted class:", "Diabetes" if pred_class == 1 else "No diabetes")