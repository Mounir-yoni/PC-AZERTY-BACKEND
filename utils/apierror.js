// @desc this class is used to create custom errors
class ApiError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.message = message;
    this.statuscode = statuscode;
    this.status = statuscode >= 400 && statuscode < 500 ? "fail" : "error";
    this.isOperational = true;
  }
}

module.exports = ApiError;
