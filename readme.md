# Find Home

Find Home is a property buying and selling platform that connects real estate companies and buyers. It allows users to browse, search, and compare properties from different companies, and also to predict loans using a machine learning model. It also provides a separate server using Python for data processing and analysis.
The best accuracy we obtained was 78.36% by using Random Forest Classifier.

## Features

- **Admin panel**: Admins can register and manage real estate companies, view and edit property details, and monitor user activity.
- **Company panel**: Companies can advertise their properties, upload images and descriptions, and set prices and availability.
- **User panel**: Users can create accounts and profiles, view and filter properties, and contact companies for inquiries. Users can also use the loan prediction feature, which uses a SVM classifier to estimate the loan amount and interest rate based on the user's income, credit score, and property value.
- **Python server**: The project uses a Python server to handle the data and logic for the loan prediction feature. The server uses the scikit-learn library to train and test the SVM classifier, and communicates with the main server using HTTP requests and responses.

## Technologies

The project is built with the following technologies:

- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside a web browser.
- **Express.js**: A web application framework for Node.js that provides features for web and mobile applications.
- **Bootstrap**: A CSS framework that simplifies the design of responsive and mobile-friendly websites.
- **HTML**: A markup language that defines the structure and content of web pages.
- **CSS**: A style sheet language that describes the presentation of web pages.
- **Python**: A high-level programming language that supports multiple paradigms, such as object-oriented, imperative, functional, and procedural.
- **scikit-learn**: A machine learning library for Python that provides tools for data analysis and modeling.

## ML Server:
The Machine learning server repository is available in this link:
https://github.com/shahriarKabir44/find_home_ML_server

## How to run it locally using docker:
- Clone this repository.
- Run the MySQL docker image
```bash 
sudo docker run -p <any port (NOT 3306)>:3306 --name findhome_mysql -e MYSQL_ROOT_PASSWORD=<password> -e MYSQL_DATABASE=find_home -d mysql:latest
```
- Create the database schema.
- - Install Migratify globally 
```bash
npm install -g migratify
```
- - Run 
```bash
migratify clear
```
- - Run the following command to create the database.
```
migratify create-db
```

- - Run the following command to create the schema.
```bash
migratfy migrate
```
- Pull the docker image of this project 

```bash 
sudo docker pull shahriarkabir/findhome:latest
```

- Run the image
```bash 
docker run -e  dbPassword=<your MySQL password> -p <port number>:4000 findhome:latest
```


