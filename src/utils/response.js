export function successResponse(res, data, message = 'Successful') {
  return res.status(200).json({
    status: true,
    success: true,
    message,
    data,
  });
}

export function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({
    status: false,
    success: false,
    message,
    data: null,
  });
}
