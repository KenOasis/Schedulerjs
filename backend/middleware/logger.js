const { format } = require("winston");
const winston = require("winston");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/logger-config.js")[env];

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
};

const httpLogger = new winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.printf((info) => {
          console.log();
          return `${info.timestamp} ${info.level}: ${info.message}`;
        })
      ),
    }),
  ],
  exitOnError: false,
});

if (config.http_logger) {
  httpLogger.add(
    new winston.transports.File({
      level: "info",
      filename: "./logs/logs.log",
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    })
  );
}

httpLogger.stream = {
  write: function (message, encoding) {
    httpLogger.info(message.trim());
  },
};

exports.httpLogger = httpLogger;

exports.errorLogger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "./logs/errors.log",
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});
