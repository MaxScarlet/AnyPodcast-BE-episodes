require('./dotenv_apply').load('dev');
// require("./aws_config");

import { APIGatewayProxyEvent } from 'aws-lambda';
import merge from 'deepmerge';
import { handler } from '../src/index';

import * as apiRequestEmpty from './data/API_Event_empty.json';
let apiRequest;
import * as apiRequestGetList from './data/API_Event_GET.json';
// import * as apiRequestGetList from './data/API_Event_POST_login.json';
apiRequest = merge(apiRequestEmpty, apiRequestGetList) as APIGatewayProxyEvent;
// apiRequest.body = JSON.stringify({"email": "user1@mail.com", "pwd": "12312"})

(async () => {
    const resp = await handler(apiRequest);
    console.log(resp);
})();
