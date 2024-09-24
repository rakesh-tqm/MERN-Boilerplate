const { HTTPCodeMsg } = require("../utils/constant");

const errorHander = (err, req, res, next) => {
  if (err instanceof notFoundError) {
    const statusCode = err.statusCode ?? HTTPCodeMsg.notFound.statusCode;
    return res.status(statusCode).json({
      error: statusCode,
      message: err.message,
    });
  } else if (err instanceof unAuthorizedError) {
    const statusCode = err.statusCode ?? HTTPCodeMsg.unAuth.statusCode;
    return res.status(statusCode).json({
      error: statusCode,
      message: err.message,
    });
  } else if (err instanceof BadRequestError) {
    const statusCode = err.statusCode ?? HTTPCodeMsg.badRequest.statusCode;
    return res.status(statusCode).json({
      error: statusCode,
      message: err.message,
    });
  } else if (err instanceof TooManyRequestError) {
    const statusCode = err.statusCode ?? HTTPCodeMsg.tooManyRequest.statusCode;
    return res.status(statusCode).json({
      error: statusCode,
      message: err.message,
    });
  } else {
    const statusCode = err.statusCode ?? HTTPCodeMsg.serverError.statusCode;
    return res.status(statusCode).json({
      error: statusCode,
      message: err.message,
    });
  }
};

// * Not Found Error Handler
class notFoundError extends Error {
  constructor(message = HTTPCodeMsg.notFound.msg) {
    super();
    this.statusCode = HTTPCodeMsg.notFound.statusCode;
    this.message = message;
  }
}

// * unAuthorized Error Handler
class unAuthorizedError extends Error {
  constructor(message = HTTPCodeMsg.unAuth.msg) {
    super();
    this.statusCode = HTTPCodeMsg.unAuth.statusCode;
    this.message = message;
  }
}

// * Bad Request Error Handler
class BadRequestError extends Error {
  constructor(message = HTTPCodeMsg.badRequest.msg) {
    super();
    this.statusCode = HTTPCodeMsg.badRequest.statusCode;
    this.message = message;
  }
}

// * Too Many Request Error Handler
class TooManyRequestError extends Error {
  constructor(message = HTTPCodeMsg.tooManyRequest.msg) {
    super();
    this.statusCode = HTTPCodeMsg.tooManyRequest.statusCode;
    this.message = message;
  }
}

module.exports = {
  errorHander,
  notFoundError,
  unAuthorizedError,
  BadRequestError,
  TooManyRequestError,
};
