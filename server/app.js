import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import initLogger from "../config/logger-config";
import adaptRequest from './helpers/adapt-request'
import handleAuthRequest from './auth'
import winston from 'winston/lib/winston/config';

const app = express();

initLogger();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/authorise', authController);
app.use('/login', authController);

function authController(req, res) {
  const httpRequest = adaptRequest(req);
  console.log(httpRequest);
  handleAuthRequest(httpRequest)
    .then(({ headers, statusCode, data }) => {
      console.log(headers, statusCode, data);
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    })
    .catch(e => res.send(status(500).end()));
}

export default app;
