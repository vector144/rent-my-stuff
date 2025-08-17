export const sendResponse = (
  res,
  data = null,
  message = "success",
  statusCode = 200,
  success = true,
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
