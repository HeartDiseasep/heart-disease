import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import sys, getopt, time
import os.path
import json


# Load the dataset (assuming it's in a CSV file named 'heart_data.csv')
io=os.path.abspath('/heart_data.csv')
data = pd.read_csv(io)
# data = pd.read_csv('./heart_data.csv')
# Separate features and target variable
X = data[['cholesterol', 'fasting_sugar', 'resting_ecg', 'blood_pressure', 'max_heart_rate']]
y = data['heart_disease']  # Assuming 'heart_disease' column indicates presence/absence

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a machine learning model (Logistic Regression as an example)
model = LogisticRegression(solver='lbfgs', random_state=42, max_iter=1000, fit_intercept=True, penalty='l2')

# Train the model on the training data
model.fit(X_train, y_train)

# Set feature names after fitting the model
model.feature_names_in_ = X.columns.tolist()

# Make predictions on the testing data
y_pred = model.predict(X_test)

# Evaluate model performance
accuracy = accuracy_score(y_test, y_pred)

# Function to predict heart disease for a new person
def predict_heart_disease(cholesterol, fasting_sugar, resting_ecg, blood_pressure, max_heart_rate):
    input_data = [[cholesterol, fasting_sugar, resting_ecg, blood_pressure, max_heart_rate]]
    result = model.predict(input_data)
    probability = model.predict_proba(input_data)[0][1]  # Probability of heart disease

    if result[0] == 1:
        return {"message":"Heart disease is predicted. ", "percentage":probability}
    else:
        return {"message":"Heart disease is not predicted. ", "percentage":probability}


def main(argv):
    
    values = {'cholesterol' : 0,
    'fasting_sugar' : 0,
    'resting_ecg' : 1,
    'blood_pressure' : 0,
    'max_heart_rate' : 80}

    # parse incoming arguments
    try:
        opts, args = getopt.getopt(argv,"hf:",["cholesterol=",
                                               "fasting_sugar=",
                                               "resting_ecg=",
                                               "blood_pressure=",
                                               "max_heart_rate="
                                               ])
    except getopt.GetoptError:
        sys.exit(2)
    for opt, arg in opts:
        values[opt.replace('--','')] = int(arg)

    prediction = predict_heart_disease(cholesterol=values['cholesterol'], fasting_sugar=values['fasting_sugar'], resting_ecg=values['resting_ecg'], blood_pressure=values['blood_pressure'], max_heart_rate=values["max_heart_rate"])         
    Y= json.dumps({"data":prediction})
    print(Y)

if __name__ == "__main__":
    main(sys.argv[1:])