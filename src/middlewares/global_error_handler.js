import { errorResponse } from '../utils/response.js';
import AppError from '../utils/app_error.js';

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err instanceof AppError ? err.statusCode || 500 : 500;
  const message =
    err instanceof AppError && err.isOperational
      ? err.message
      : 'Something went wrong!';

  if (err instanceof AppError && err.isOperational) {
    return errorResponse(res, statusCode, message);
  }

  console.error('ERROR 💥:', err);

  return errorResponse(res, statusCode, 'Internal server error');
};

export default globalErrorHandler;
