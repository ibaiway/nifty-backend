import config from '../config/config.js';

async function errorMiddleware(err, req, res, next) {
  config.logger.error(err);

  if (req.headersSent) {
    // When you add a custom error handler,
    // you must delegate to the default Express error handler,
    // when the headers have already been sent to the client:
    return next(err);
  }

  res.status(500).send({
    data: null,
    error: 'Something went wrong'
  });
}

export default errorMiddleware;
