module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error("Async Error Handler caught an error:", error);

    next(error);
  });
};
