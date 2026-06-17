const errorHandler = (err, req, res, next) => {
  console.log(err);
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
    stack: process.env.NODE_ENV === "production" ? null : err.stack;
  }
  res.status(statusCode).json({ message });
};

export { errorHandler };
