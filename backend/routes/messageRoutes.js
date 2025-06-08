const express = require("express");
const {
  createMessage,
  getAllMessages,
  getMessagesByUserId,
  getMessagesByGroupId,
} = require("../controllers/messageController"); // Adjust the path as necessary
const isAuthenticated = require("../middleware/isAuthenticated"); // Middleware to check if user is authenticated
const router = express.Router();
const upload = require("../middleware/multer");
const fileUpload = require("../controllers/uploadContrller");

router.route("/new").post(isAuthenticated, createMessage); // Route to create a new message
router.route("/:recieverId").get(isAuthenticated, getMessagesByUserId); // Route to get all messages
router.route("/group/:groupId").get(isAuthenticated, getMessagesByGroupId);
router
  .route("/filesupload")
  .post(isAuthenticated, upload.array("files", 5), fileUpload);

module.exports = router;
