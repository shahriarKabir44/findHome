#the initModel function is called when the server is started. therefore all the
#codes related to data cleaning, model training should be done inside that function

#it is advised to define separted functions for data cleaning pipelines and model training
#e.g. define a function for a data cleaning pipeline as cleanData()
#and a function for model training as train()
#then call them in the initModel() function

#since the dataset will be on the local machine, you should not use the Google drive related python modules
 


def initModel(): 
    
  import numpy as np
import pandas as pd
#loading the dataset to a pandas dataframe
data = pd.read_csv("E:\\NSU\\13th_Semester\\CSE499B\\Train_Loan_Home.csv")

data = data.drop('Loan_ID',axis=1)
data = data.drop('ApplicantIncome',axis=1)
data = data.drop('CoapplicantIncome',axis=1)
data = data.drop('LoanAmount',axis=1)

columns = ['Gender', 'Dependents', 'LoanAmount_In_Taka', 'Loan_Amount_Term']
data= data.dropna(subset=columns)
data['Self_Employed'] = data['Self_Employed'].fillna(data['Self_Employed'].mode()[0])
data['Credit_History'] = data['Credit_History'].fillna(data['Credit_History'].mode()[0])

data['Dependents'] = data['Dependents'].replace(to_replace="3+",value='4')
data['Gender'] = data['Gender'].map({'Male':1, 'Female':0}).astype('int')
data['Married'] = data['Married'].map({'Yes':1, 'No':0}).astype('int')
data['Education'] = data['Education'].map({'Graduate':1, 'Not Graduate':0}).astype('int')
data['Self_Employed'] = data['Self_Employed'].map({'Yes':1, 'No':0}).astype('int')
data['Property_Area'] = data['Property_Area'].map({'Rural':0, 'Semiurban':2, 'Urban':1}).astype('int')
data['Loan_Status'] = data['Loan_Status'].map({'Y':1, 'N':0}).astype('int')

X = data.drop('Loan_Status',axis=1)
y = data['Loan_Status']
y

cols = ['ApplicantIncome_In_Taka', 'CoapplicantIncome_In_Taka', 'LoanAmount_In_Taka', 'Loan_Amount_Term']
from sklearn.preprocessing import StandardScaler
st = StandardScaler()
X[cols] = st.fit_transform(X[cols])
X

from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.metrics import accuracy_score
import numpy as np
import warnings
warnings.filterwarnings("ignore")

model_df={}
def model_val(model, X,y):
  X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.20, random_state=42)

  model.fit(X_train, y_train)
  y_pred = model.predict(X_test)
  print(f"{model} accuracy is {accuracy_score(y_test, y_pred)}")

  score = cross_val_score(model, X, y, cv= 5)
  print(f"{model} Avg cross val score is {np.mean(score)}")
  model_df[model] = round(np.mean (score)*100, 2)
model_df

from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model_val(model, X, y)

from sklearn import svm
model = svm.SVC()
model_val(model, X, y)

from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier()
model_val(model, X, y)

from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model_val(model, X, y)

from sklearn.ensemble import GradientBoostingClassifier
model = GradientBoostingClassifier()
model_val(model, X, y)

from sklearn.model_selection import RandomizedSearchCV

log_reg_grid = {"C": np.logspace(-4,4,20),
                "solver":['liblinear']}
rs_log_reg = RandomizedSearchCV(LogisticRegression(),param_distributions=log_reg_grid,
                   n_iter= 20, cv= 5, verbose= True)
rs_log_reg.fit(X,y)
rs_log_reg.best_score_
rs_log_reg.best_params_

svc_grid = {'C':[0.25,0.50,0.75,1], "kernel": ["linear"]} 
rs_svc = RandomizedSearchCV(svm.SVC(),
                   param_distributions=svc_grid,
                   cv = 5,
                   n_iter = 20,
                   verbose = True)
rs_svc.fit(X,y)
rs_svc.best_score_
rs_svc.best_params_

RandomForestClassifier()
rf_grid = {'n_estimators': np.arange(10,1000,10),
 'max_features' : ['auto', 'sqrt'],
 'max_depth': [None, 3, 5, 20, 30],
 'min_samples_split': [2, 5,20,50,100],
 'min_samples_leaf' : [1,2,5,10]
 }
rs_rf = RandomizedSearchCV(RandomForestClassifier(),
                   param_distributions=rf_grid,
                   cv = 5,
                   n_iter = 20,
                   verbose = True)
rs_rf.fit(X,y)
rs_rf.best_score_
rs_rf.best_params_

X = data.drop('Loan_Status',axis=1)
y = data['Loan_Status']
rf = RandomForestClassifier(n_estimators= 310,
 min_samples_split= 5,
 min_samples_leaf= 2,
 max_features= 'auto',
 max_depth= 3)
rf.fit(X,y)
import joblib
joblib.dump(rf,'loan_status_predict')
model = joblib.load('loan_status_predict')
import pandas as pd
df = pd.DataFrame({
    'Gender': 1,
    'Married': 1,
    'Dependents': 2,
    'Education' : 0,
    'Self_Employed': 0,
    'ApplicantIncome_In_Taka': 622333.6,
    'CoapplicantIncome_In_Taka': 160451.2,
    'LoanAmount_In_Taka': 13619.2,
    'Loan_Amount_Term': 360,
    'Credit_History': 1.0,
    'Property_Area': 1
}, index=[0])
df
result = model.predict(df)
if result==1:
  print("Loan will be Approved")
else:
  print("Loan will Not be Approved")

#the only parameter of this function is of type dict
#it contains all the data submitter from the form
#this function will use the data to predic the output
#the output should be a dictionary

def predict(df):
    #X = df.drop('Loan_Status', axis=1)
    model = joblib.load('loan_status_predict')
    result = model.predict(X)

    if result.any() == 1:
        return {"message": "Loan will be approved!"}
    else:
        return {"message": "Loan will not be approved!"}


# Call the predict function and capture the return value in a variable
result = predict(data)

# Use the return value in your code
print(result["message"])  # Output: Loan will be approved! or Loan will not be approved!

