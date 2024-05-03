# Refiberd Tag Reader
## Capstone Final Project, Spring 2024
### University of California, Berkeley. School of Information

**Team Members**
- Abdullah Azhar
- Erin Jones
- Mustafa Hameed
- Isidora Rollán
- Prashant Sharma

<hr>

## How to run this project in your local computer

Once you are in the correct folder (capstone-app2), run `amplify init`

- The owner of this project will need to give you the IAM username and password related to this project.
- After that run in the root folder `amplify push`, this will udpate all the configurations that aren't present in the code repo.


# Composition of this Project

This project represents a simple solution to solve a problem for a start up called [Refiberd](https://refiberd.com/). This product has the objective of identifying the composition of a fabric by taking a picture of the tag description.

This project has two main parts.
1. The Web Application
2. The Model

## Web Application

This section is devoted to explain the structure of this repository and what is the objective of each relevant file.

### 1. src folder

This folder has the front end components of our web application

- **Header:** header of the webpage that has a the logo and a sign out button. When the user press the logo, goes back to Main page.
- **Maing Page:** homepage of the web application. Has a button that goes to the next component
- **Camera:** component that opens the camera of the device. If it is a phone will open the back camera and if it is a computer it will open the front camera. 
    - After the picture is taken and the user clicks `Send` this code calls the backend by uploading the photo in the S3 bucket.
    - When the S3 answer with the image Key, the fron then calls the API that retrieves the picture from the S3 bucket and send it to the Machine Learning model.
- **Loading Page:** the ML models takes a few seconds to respond. For that matter, we created a loader so the user knows that the web application is working.
- **Form:** With the model answer, this components renders the output so it can be easily seen by the user
    - It has the main result with a "Total Percentage" validation that will not allow the user to continue if the sum of the compositions does not sum 100.
    - If the model prediction is incorrect or incomplete, the user can `edit` and add manually the distribution.
    - Once the user clicks `Confirm` the form calls the API that connects with the database (DynamoDB) of this project.
- **Success Page:** Very simple page that retrieves the ID of the tag if necessary and has the objective to signal the user that everything is saved.

- **styles:** Css styles specific for some of the components.
- **App.js** has the maind theme and renders all the previous components. It also has the global variables (`createContext`) necessary to navigate between components. It also has Amazon Cognito. The users cannot use this web application unless they are authenticated (this also counts in the local version).
- **Index.js:** has some extra coding to configure amplify in the React.js code.
- **ui-components:** unused functionality that creates components from the Figma created according to Amplify baseline.

### 2. amplify folder

Most of the content of this folder is generated automatically when interacting with Amplify through the console. The main code and manual variations are made in the `backend` folder.

- **Api/compositionApi** has the path of the API Rest to call save the new information in the database.
- **auth** has the default code for the authentication setup.
- **function/compositionFunction** has the Lambda (serverless computer) that manages all the logic of the API and send and retrieve information from the DynamoDB.
    - The main code is present in `app.js`, where all the amplify+DynamoDB packages are set.
    - THe `GET` and `DELETE` code is the one created by Amplify by default when configuring from the console (adding an API, adding a Lambda Trigger, creating and connecting a DynamoDB)
    - In the `POST` and `PUT` code is where we change the default code so it identify the JSON send through the API from the front, sets 0 as the default values for each fabric and then updates with the information received from the JSON. It also has a validator to make sure that the sum of the % is equal to 100.

- **storage** has the basic configuration of the database (dynamoDB) and the Folder (S3 bucket).

## The Model

To know more about the model, open this [Repository](www.github.com)