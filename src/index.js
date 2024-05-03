import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import amplifyconfig from './amplifyconfiguration.json';

//importing Amplify and AWS packages used in the project
Amplify.configure(awsconfig);
Amplify.configure(amplifyconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
