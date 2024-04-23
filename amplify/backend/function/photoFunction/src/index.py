# import json

# def handler(event, context):
#   print('received event:')
#   print(event)
  
#   return {
#       'statusCode': 200,
#       'headers': {
#           'Access-Control-Allow-Headers': '*',
#           'Access-Control-Allow-Origin': '*',
#           'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
#       },
#       'body': json.dumps('Hello from your new Amplify Python lambda!')
#   }

## NOTE: to use Python in this project you have to navigate to the project directory and use virtualenv (I called in my computer capstoneenv)
# -> in this virtual environment are all the packages needed installed

from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import awsgi
import boto3

app = Flask(__name__)
CORS(app)

## helper function to invoke sagemaker model
sagemaker_runtime = boto3.client('runtime.sagemaker')

def invoke_sagemaker_model(endpoint_name, payload):
    response = sagemaker_runtime.invoke_endpoint(
        EndpointName=endpoint_name,
        ContentType='application/x-image',
        Body=payload
    )
    model_predictions = response['Body'].read()
    return model_predictions

@app.route("/sendphoto", methods = ['POST'])
@cross_origin() # This decorator can be used to allow specific origins, methods, etc.
def upload_file():
    #Check if a photo is part of the request
    if 'photo' in request.files:
        file = request.files['photo']
        # Process the file as needed by your model
        # For instance, convert to the format or directly pass the binary
        predictions = invoke_sagemaker_model('your-sagemaker-endpoint', file.read())

        # Process the predictions as needed to format them into a JSON response
        return jsonify(predictions), 200
    else:
        return jsonify({"error": "No photo uploaded"}), 400

def handler(event, context):
    return awsgi.response(app, event, context)