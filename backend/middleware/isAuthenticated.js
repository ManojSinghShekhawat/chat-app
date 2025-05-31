const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("./asyncErrorHandler");
const isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

module.exports = isAuthenticated;
