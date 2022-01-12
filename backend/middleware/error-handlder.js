const LogicalError = require("../error/LogicalError");
const ValidationError = require("../error/ValidationError");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/logger-config.js")[env];
const errorLogger = require("./logger").errorLogger;
const errorHanlder = (err, req, res, next) => {
  if (config.error_logger) {
    errorLogger.error(err.name);
    errorLogger.error(err.stack);
  }
  if (err instanceof ValidationError) {
    return res.status(err.http_code).json({
      status: "forbidden",
      message: "Your action is forbidden",
    });
  } else if (err instanceof LogicalError) {
    return res.status(err.http_code).json({
      status: "error",
      message: "Internal Data Error. Please contact admin.",
    });
  } else {
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

module.exports = errorHanlder;
