const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isStarred: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
// This code defines a Mongoose schema for a message model in a chat application.
