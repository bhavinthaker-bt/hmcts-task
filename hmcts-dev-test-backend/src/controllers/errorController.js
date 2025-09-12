module.exports = (err, req, res, next) => {
  // eslint-disable-next-line eqeqeq
  if (err.name === 'CastError') {
    err.message = `Invalid ${err.path} : ${err.value}`;
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  res
    .status(err.statusCode)
    .json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
    })
    .end();
};
