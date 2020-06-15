import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import winston from 'winston/lib/winston/config';
import initLogger from '../config/logger-config';
import adaptRequest from './helpers/adapt-request';
import handleAuthRequest from './auth';
import handleLoginRequest from './login';

const app = express();

initLogger();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

function expressCallback(requestHandler) {
  return function reqRes(req, res) {
    const httpRequest = adaptRequest(req);
    requestHandler(httpRequest)
      .then(({ headers, statusCode, data }) => {
        res
          .set(headers)
          .status(statusCode)
          .send(data);
      })
      .catch((e) => {
        winston.error(e);
        res.send(status(500).end());
      });
  };
}

app.use('/authorise', expressCallback(handleAuthRequest));
app.use('/login', expressCallback(handleLoginRequest));
// app.use('/signup', expressCallback(handleSignUpRequest));

export default app;
