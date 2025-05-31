const express = require("express");
const {
  createMessage,
  getAllMessages,
  getMessagesByUserId,
} = require("../controllers/messageController"); // Adjust the path as necessary
const isAuthenticated = require("../middleware/isAuthenticated"); // Middleware to check if user is authenticated
const router = express.Router();

router.route("/new").post(isAuthenticated, createMessage); // Route to create a new message
router.route("/:recieverId").get(isAuthenticated, getMessagesByUserId); // Route to get all messages

module.exports = router;
