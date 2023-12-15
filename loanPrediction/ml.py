import pandas as pd
import joblib
model = None


def initModel(dir):
    model = joblib.load('loan_status_predict')


def predict(data):
    # X = df.drop('Loan_Status', axis=1)
    df = pd.DataFrame.from_dict(data, orient='index')
    model = joblib.load('loan_status_predict')
    result = model.predict(df)

    if result.any() == 1:
        return {"message": "Loan will be approved!"}
    else:
        return {"message": "Loan will not be approved!"}
