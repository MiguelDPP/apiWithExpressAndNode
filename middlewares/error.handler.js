const { ValidationError,
  // Error global de sequelize
  DatabaseError
} = require('sequelize');

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError || err instanceof DatabaseError) {
    res.status(400).json({
      statusCode: 400,
      message: err.message,
      errors: err.errors,
    });

  } else {
    console.error("No es un error de validación");
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
