// Logical Error is a kind of error which caused by the illogical or invalid data
// in the database.
class LogicalError extends Error {
  constructor(message, http_code) {
    super(message);
    this.name = "LogicalError";
    this.http_code = http_code;
    this.date = new Date();
  }
}

module.exports = LogicalError;
