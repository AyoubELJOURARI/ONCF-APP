const AppError = require('../utils/appError');

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).render('Error', {
      title: 'Something went wrong !',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //log error
    console.error('Error !', err);
    //send generic error
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  } else {
    if (err.isOperational) {
      return res.status(err.statusCode).render('Error', {
        title: 'Something went wrong !',
        msg: err.message,
      });
    } else {
      console.error('Error !', err);
      //send generic error
      return res.status(err.statusCode).json({
        title: 'Something went wrong !',
        msg: 'Please try again later',
      });
    }
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };

  sendErrorDev(err, req, res);
};
