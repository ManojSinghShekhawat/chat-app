const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

const fileUpload = asyncErrorHandler(async (req, res, next) => {
  try {
    const uploadedFiles = req.files.map((file) => ({
      url: file.path, // Cloudinary URL
      name: file.originalname, // Original file name
      type: file.mimetype, // MIME type
    }));

    res.status(200).json({ success: true, files: uploadedFiles });
  } catch (error) {
    next(error);
  }
});

module.exports = fileUpload;
