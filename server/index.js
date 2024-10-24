const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Client connected: ", socket.id);

  // Nhận sự kiện 'print_shape' từ client
  socket.on("print_shape", (shapeType) => {
    console.log(`Shape to print: ${shapeType}`);

    // Phát sự kiện này đến tất cả các client khác, trừ client phát
    socket.broadcast.emit("print_shape", shapeType);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
