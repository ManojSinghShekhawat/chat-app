const Message = require("../models/message"); // Adjust the path as necessary
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

const mongoose = require("mongoose");

// Create a new message
const createMessage = asyncErrorHandler(async (req, res) => {
  try {
    const { senderId, recieverId, content } = req.body;

    if (!senderId || !recieverId || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: recieverId,
      content,
      timestamp: new Date(),
    });

    await newMessage.save();
    res.status(201).json({
      message: "Message created successfully",
      data: newMessage,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get all messages
const getAllMessages = asyncErrorHandler(async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.status(200).json({
      message: "Messages retrieved successfully",
      messages,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get message belongs to a userId
const getMessagesByUserId = asyncErrorHandler(async (req, res) => {
  try {
    const recieverId = req.params.recieverId;
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [
        {
          sender: new mongoose.Types.ObjectId(userId),
          receiver: new mongoose.Types.ObjectId(recieverId),
        },
        {
          sender: new mongoose.Types.ObjectId(recieverId),
          receiver: new mongoose.Types.ObjectId(userId),
        },
      ],
      isDeleted: false, // Exclude deleted messages
    }).sort({ timestamp: -1 });

    if (!messages.length) {
      return res
        .status(404)
        .json({ message: "No messages found for this user" });
    }

    res.status(200).json({
      message: "Messages retrieved successfully",
      messages,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  createMessage,
  getAllMessages,
  getMessagesByUserId,
};
