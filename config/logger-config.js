import winston, { transports, format } from "winston";

function initLogger() {
  return winston.configure({
    level: "debug",
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format.printf(
        info => `${info.timestamp} ${info.level}: ${displayLogger(info)}`
      )
    ),
    transports: [new transports.Console()]
  });
}

function displayLogger(info) {
  return /error/.test(info.level)
    ? `${info.err} ${JSON.stringify(info, null, 2)}`
    : info.message;
}

export default initLogger;