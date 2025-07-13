const ApiError = require("../utils/apierror");

const senderrorDev = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const senderrorprod = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
  });
};

const handleJWTErrorSignature = () =>
  new ApiError("Invalid Token Please login again", 401);
const handleJWTErrorTokenExpiredError = () =>
  new ApiError("Token Expired Please login again", 401);
const globalerror = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    senderrorDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJWTErrorSignature();
    if (err.name === "TokenExpiredError")
      err = handleJWTErrorTokenExpiredError();
    senderrorprod(err, res);
  }
};

module.exports = globalerror;
