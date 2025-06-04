const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const Group = require("../models/group");
const Contact = require("../models/contact");
const mongoose = require("mongoose");
const User = require("../models/user");

// create a new group
const createGroup = asyncErrorHandler(async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const contactIds = req.body.members || [];
    const contacts = await Contact.find({ _id: { $in: contactIds } });

    const userIds = contacts.map((contact) => contact.contact);

    const membersIds = [new mongoose.Types.ObjectId(req.user.id), ...userIds];
    console.log(membersIds);

    if (!name || !members || members.length === 0) {
      return res.status(400).json({ message: "Name and members are required" });
    }

    const group = new Group({
      name,
      description,
      members: membersIds,
    });

    await group.save();
    res.status(201).json({
      message: "Group created successfully",
      group,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get all groups belonging to a user
const getAllGroups = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await Group.find({
      members: { $in: [new mongoose.Types.ObjectId(userId)] },
    })
      .populate("members", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Groups retrieved successfully",
      groups,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get group detisails by group ID including members
const getGroupDetails = asyncErrorHandler(async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const members = await Promise.all(
      group.members
        .filter((member) => member && member._id) // Filter out null or missing _id
        .map((member) => User.findById(member._id))
    );

    res.status(200).json({
      message: "Group details retrieved successfully",
      members,
      group,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  createGroup,
  getAllGroups,
  getGroupDetails,
};
