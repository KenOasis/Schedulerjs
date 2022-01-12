require("dotenv").config();

module.exports = {
  development: {
    http_logger: false,
    error_logger: false,
  },
  test: {
    http_logger: true,
    error_logger: true,
  },
  production: {
    http_logger: true,
    error_logger: true,
  },
};
