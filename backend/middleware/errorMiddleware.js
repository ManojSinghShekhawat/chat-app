const ErrorHandler = require("../utils/errorHandler");

// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal Server Error";

//   res.status(err.statusCode).json({
//     success: false,

//     message: err.message,
//   });
// };

module.exports = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode =
    typeof err.statusCode === "number" &&
    err.statusCode >= 100 &&
    err.statusCode < 600
      ? err.statusCode
      : 500;

  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
