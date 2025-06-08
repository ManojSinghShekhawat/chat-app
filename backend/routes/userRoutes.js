const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  authStatus,
  addContact,
  getUserContacts,
  updateUser,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();
const upload = require("../middleware/multer");

// Route to create a new user
router.route("/register").post(createUser);
// Route to login a user
router.route("/login").post(loginUser);
// Route to logout a user
router.route("/logout").get(isAuthenticated, logoutUser);
// Route to check authentication status
router.route("/authstatus").get(isAuthenticated, authStatus);

// Route to add a contact
router.route("/addContact").post(isAuthenticated, addContact);
// Route to get user contacts
router.route("/contacts").get(isAuthenticated, getUserContacts);
router
  .route("/:userid")
  .put(isAuthenticated, upload.single("avatar"), updateUser);

// Export the router
module.exports = router;
