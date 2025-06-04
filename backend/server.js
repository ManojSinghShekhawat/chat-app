const app = require("./app");
const connectDB = require("./config/dbConnect");
require("dotenv").config({ path: "./config/config.env" });
const Message = require("./models/message");
const http = require("http");
const server = http.createServer(app);

const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.1.4:5173"], // Allow all origins for simplicity; adjust as needed
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials if needed
  },
});

// Socket.IO connection
io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
  });

  //handle sending messages

  socket.on("sendMessage", async (message) => {
    const { senderId, receiverId, content, groupId } = message;

    //save the message to the database
    try {
      const newMessage = await Message.create({
        sender: senderId,
        receiver: receiverId || null,
        group: groupId || null,
        content,
        timestamp: new Date(),
      });

      if (groupId) {
        io.to(groupId).emit("receiveMessage", newMessage);
      } else {
        io.to(receiverId).emit("receiveMessage", newMessage);
        io.to(senderId).emit("receiveMessage", newMessage);
      }
    } catch (error) {
      console.error("Error saving message:", error);
      return;
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect to the database
connectDB();
// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
