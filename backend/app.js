const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.4:5173"],
    credentials: true,
  })
);

// Routes
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.use(errorMiddleware);
module.exports = app;
