# 💬 Chat App

A real-time chat application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Socket.IO**. This app allows users to sign up, log in, view contacts, and send real-time messages.

## 🚀 Features

- 🔒 JWT-based authentication (stored in cookies)
- 🧑‍🤝‍🧑 Contact list and user selection
- 💬 Real-time messaging with Socket.IO
- 📨 Message history stored in MongoDB
- 📱 Mobile responsive (tested on LAN IP)
- 🌐 CORS configured for both localhost and LAN access

---

## 📂 Project Structure

```bash
chat-app/
├── backend/              # Express server and APIs
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── app.js
│   └── server.js
├── frontend/             # React frontend (Vite-based)
│   ├── components/
│   ├── redux/
│   ├── util/socket.js
│   └── main.jsx
└── README.md
```

---

## ⚙️ Tech Stack

### Frontend:

- React (with Vite)
- Redux Toolkit
- Chakra UI
- Socket.IO Client

### Backend:

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO Server

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ManojSinghShekhawat/chat-app.git
cd chat-app
```

### 2. Start Backend

```bash
cd backend
npm install
npm run dev
```

> ⚠️ Create a `.env` file in `backend/config/config.env` with the following:

```env
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Start Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> The app will be available at [http://localhost:5173](http://localhost:5173)

---

## 🌐 LAN/Mobile Access

To test on a mobile device connected to the same WiFi:

- Replace `localhost` in `.env` or hardcoded URLs with your **local IP**, e.g.:

  ```
  http://192.168.1.4:3000
  ```

- Update CORS in backend:

```js
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.4:5173"],
    credentials: true,
  })
);
```

- Set cookies like this:

```js
res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

---

## 📦 API Endpoints

| Method | Route                          | Description      |
| ------ | ------------------------------ | ---------------- |
| POST   | `/api/v1/auth/register`        | Register user    |
| POST   | `/api/v1/auth/login`           | Login user       |
| GET    | `/api/v1/users/contacts`       | Get contact list |
| GET    | `/api/v1/messages/:receiverId` | Fetch messages   |

---

## 🔌 Socket.IO Events

| Event            | Payload                             | Description         |
| ---------------- | ----------------------------------- | ------------------- |
| `join`           | `userId`                            | Join user's room    |
| `sendMessage`    | `{ senderId, receiverId, content }` | Send message        |
| `receiveMessage` | `message`                           | Receive new message |

---

## 📸 Screenshots

_(Add screenshots here if available)_

---

## 🙋‍♂️ Author

**Manoj Singh Shekhawat**

- GitHub: [@ManojSinghShekhawat](https://github.com/ManojSinghShekhawat)

---

## 📃 License

This project is licensed under the MIT License.
