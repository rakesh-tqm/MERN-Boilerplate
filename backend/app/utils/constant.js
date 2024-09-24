const HTTPCodeMsg = {
  Ok: { statusCode: 200, msg: "processed successfully" },
  notFound: { statusCode: 404, msg: "Not found." },
  unAuth: { statusCode: 401, msg: "Unauthorized Error." },
  badRequest: { statusCode: 400, msg: "Bad Request." },
  tooManyRequest: {statusCode: 429, msg: 'Too many attempts, Please try again later.'},
  serverError: { statusCode: 500, msg: "Internal Server Error." },
};

module.exports = { HTTPCodeMsg };
