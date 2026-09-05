const errorHandler = (err, req, res, next) => {
  console.log(err);
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
  }
  res.status(statusCode).json({ message });
};

export { errorHandler };
