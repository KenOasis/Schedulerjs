const { format } = require("winston");
const winston = require("winston");
const morgan = require("morgan");
const formatter = (params) => {
  return undefined !== params.message ? params.message : "";
};
const WinstonLogger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "./logs/logs.log",
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
      format: format.combine(format.splat(), format.simple()),
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
      format: format.combine(format.splat(), format.simple()),
    }),
    new winston.transports.File({
      level: "debug",
      filename: "./logs/errors.log",
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
      format: format.combine(format.splat(), format.simple()),
    }),
  ],
  exitOnError: false,
});

WinstonLogger.stream = {
  write: function (message, encoding) {
    WinstonLogger.info(message);
  },
};
morgan.token("body", (req, res) => JSON.stringify(req.body));
const logger = morgan(
  ":method :url :status :response-time ms - :res[content-length] :body",
  { stream: WinstonLogger.stream }
);
module.exports = logger;
