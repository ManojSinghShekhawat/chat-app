const cloudinary = require("../utils/cloudonary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === "application/pdf";
    return {
      folder: "chat-app",
      resource_type: isPDF ? "raw" : "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });
module.exports = upload;
