import createHttpError, { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError || createHttpError.isHttpError(err)) {
    return res.status(err.status).json({
      message: err.message
    });
  }

  return res.status(500).json({
    message: err.message || 'Internal Server Error'
  });
};
