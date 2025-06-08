const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_END_URL || "http://localhost:5173 ",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/groups", groupRoutes);

app.use(errorMiddleware);
module.exports = app;
