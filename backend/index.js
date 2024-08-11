import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {           
  console.log(`User connected: ${socket.id}`);

  // Join a room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Handle sending messages
  socket.on("send_message", (data) => {
    const { room, msg } = data;
    console.log(`Message from ${socket.id} to room ${room}: ${msg}`);
    socket.to(room).emit("receive_message", { message: msg });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(4500, () => {
  console.log("Server is started on port 4500");
});
