class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = 'failure';
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ApiError;
