import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from "aws-amplify";
import AwsConfigDev from './aws-dev';
import AwsConfigProd from './aws-prod';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './functional.css';
import 'font-awesome/css/font-awesome.css';

Amplify.configure(getAmplifyConfiguration());

function getAmplifyConfiguration() {
  let AwsConfig = AwsConfigDev
  if (process.env.NODE_ENV === 'development') {
    AwsConfig = AwsConfigDev
  } else {
    AwsConfig = AwsConfigProd
  }
  return {
    Auth: {
      mandatorySignIn: false,
      region: AwsConfig.cognito.REGION,
      userPoolId: AwsConfig.cognito.USER_POOL_ID,
      identityPoolId: AwsConfig.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: AwsConfig.cognito.APP_CLIENT_ID
    },
    API: {
      endpoints: [
        {
          name: "rewards",
          endpoint: AwsConfig.apiGateway.URL,
          region: AwsConfig.apiGateway.REGION
        },
      ]
    }
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
