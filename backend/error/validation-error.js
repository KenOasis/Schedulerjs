// Validation Error is the error which the client request to do something
// but they are not authorized to
class ValidationError extends Error {
  constructor(message, http_code) {
    super(message);
    this.name = "ValidationError";
    this.http_code = http_code;
    this.date = new Date();
  }
}

module.exports = ValidationError;
