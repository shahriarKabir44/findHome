import numpy as np
import pandas as pd 
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.metrics import accuracy_score
import numpy as np
import warnings
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV
import joblib
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier

def model_val(model, X,y):
	X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.20, random_state=42)

	model.fit(X_train, y_train)
	y_pred = model.predict(X_test)
	print(f"{model} accuracy is {accuracy_score(y_test, y_pred)}")

	score = cross_val_score(model, X, y, cv= 5)
	print(f"{model} Avg cross val score is {np.mean(score)}")
	model_df[model] = round(np.mean (score)*100, 2)

model=None
def initModel(dir): 
  
	data = pd.read_csv(dir)

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


	cols = ['ApplicantIncome_In_Taka', 'CoapplicantIncome_In_Taka', 'LoanAmount_In_Taka', 'Loan_Amount_Term']
	st = StandardScaler()
	X[cols] = st.fit_transform(X[cols])




	model_df={}



	model = LogisticRegression()
	model_val(model, X, y)

	model = svm.SVC()
	model_val(model, X, y)

	model = DecisionTreeClassifier()
	model_val(model, X, y)

	model = RandomForestClassifier()
	model_val(model, X, y)

	model = GradientBoostingClassifier()
	model_val(model, X, y)


	log_reg_grid = {"C": np.logspace(-4,4,20),
					"solver":['liblinear']}
	rs_log_reg = RandomizedSearchCV(LogisticRegression(),param_distributions=log_reg_grid,
					n_iter= 20, cv= 5, verbose= True)
	rs_log_reg.fit(X,y)


	svc_grid = {'C':[0.25,0.50,0.75,1], "kernel": ["linear"]} 
	rs_svc = RandomizedSearchCV(svm.SVC(),
					param_distributions=svc_grid,
					cv = 5,
					n_iter = 20,
					verbose = True)
	rs_svc.fit(X,y)


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


	X = data.drop('Loan_Status',axis=1)
	y = data['Loan_Status']
	rf = RandomForestClassifier(n_estimators= 310,
	min_samples_split= 5,
	min_samples_leaf= 2,
	max_features= 'auto',
	max_depth= 3)
	rf.fit(X,y)
	joblib.dump(rf,'loan_status_predict')
	model = joblib.load('loan_status_predict')
 



def predict(data):
    #X = df.drop('Loan_Status', axis=1)
	df = pd.DataFrame.from_dict(data, orient='index')
    model = joblib.load('loan_status_predict')
    result = model.predict(X)

    if result.any() == 1:
        return {"message": "Loan will be approved!"}
    else:
        return {"message": "Loan will not be approved!"}


 
