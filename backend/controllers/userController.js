const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const User = require("../models/user");
const Contact = require("../models/contact");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");

//create a new user
const createUser = asyncErrorHandler(async (req, res, next) => {
  const { username, email, password, mobile } = req.body;

  if (!username || !email || !password) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const user = await User.create({ username, email, password, mobile });
  await Contact.findOneAndUpdate(
    { mobile },
    { isRegistered: true },
    { new: true, upsert: true }
  );

  sendToken(user, 201, res);
});

//update a user
const updateUser = asyncErrorHandler(async (req, res, next) => {
  const { username, email, mobile } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    username,
    email,
    mobile,
  });

  res.status(201).json({
    success: true,
    message: "Profile updated successfully",
    updatedUser,
  });
});

//login a user
const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    next(new ErrorHandler("Wrong email or password", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next(new ErrorHandler("Wrong email or password", 401));
  }

  sendToken(user, 200, res);
});

//logout user
const logoutUser = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 0, // Set maxAge to 0 to clear the cookie
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//auth status check
const authStatus = asyncErrorHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Not authenticated", 401));
  }
  // If the user is authenticated, return the user data
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//add a contact
const addContact = asyncErrorHandler(async (req, res, next) => {
  const { name, mobile } = req.body;

  const existingContact = await Contact.findOne({
    mobile,
    user: req.user.id,
  });

  if (existingContact) {
    return next(new ErrorHandler("Contact already exists", 400));
  }

  const isRegistered = await User.findOne({ mobile });

  const newContact = await Contact.create({
    user: req.user.id,
    contact: isRegistered ? isRegistered._id : null,
    isRegistered: isRegistered ? true : false,
    name,
    mobile,
  });

  res.status(201).json({
    message: "Contact added successfully",
    success: true,
    newContact,
  });
});

//get user contacts belong to the user
const getUserContacts = asyncErrorHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user.id, isRegistered: true })
    .populate("contact", "username email")
    .exec();

  res.status(200).json({
    success: true,
    contacts,
  });
});

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  authStatus,
  addContact,
  getUserContacts,
  updateUser,
};
