const LogicalError = require("../error/logical-error");
const ValidationError = require("../error/validation-error");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/logger-config.js")[env];
const errorLogger = require("./logger").errorLogger;
const errorHanlder = (err, req, res, next) => {
  if (config.error_logger) {
    errorLogger.error(err.name);
    errorLogger.error(err.stack);
  }
  console.log(err);
  if (err instanceof ValidationError) {
    return res.status(err.http_code).json({
      status: "Unauthorized",
      message: "Wrong Credential!",
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
