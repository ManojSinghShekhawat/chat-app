const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isFavorite: { type: Boolean, default: false },
    name: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    isRegistered: { type: Boolean, default: false },
    mobile: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
