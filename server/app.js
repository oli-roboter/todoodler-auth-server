import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import winston from 'winston/lib/winston/config';
import initLogger from '../config/logger-config';
import adaptRequest from './helpers/adapt-request';
import {
  signupEndpointHandler,
  loginEndpointHandler,
  authEndpointHandler,
} from './interfaces';

const app = express();

initLogger();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res
      .status(400)
      .send({
        data: {
          success: false,
          error: 'Bad request, username or password are not valid',
        },
      });
  }
  next();
});

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

app.use('/authorise', expressCallback(authEndpointHandler));
app.use('/login', expressCallback(loginEndpointHandler));
app.use('/signup', expressCallback(signupEndpointHandler));

export default app;
