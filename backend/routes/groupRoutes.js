const express = require("express");
const {
  createGroup,
  getAllGroups,
  getGroupDetails,
} = require("../controllers/groupController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();
// Route to create a new group
router.post("/create", isAuthenticated, createGroup);
// Route to get details of a specific group by group ID
router.route("/:groupId").get(isAuthenticated, getGroupDetails);
// Route to get all groups for a user
router.get("/", isAuthenticated, getAllGroups);
module.exports = router;
