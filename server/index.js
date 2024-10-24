const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path"); // Để xử lý các tệp tĩnh (nếu cần cho client)

const app = express();

// Cấu hình CORS để cho phép từ mọi nguồn hoặc một nguồn cụ thể (tùy chỉnh nếu cần)
const io = new Server(http.createServer(app), {
  cors: {
    origin: process.env.FRONTEND_URL || "*", // Chỉ định URL frontend nếu có
    methods: ["GET", "POST"]
  }
});

// Middleware để phục vụ tệp tĩnh nếu bạn có client ở cùng server (chạy trên Express)
app.use(express.static(path.join(__dirname, "public"))); 

// Thiết lập một route đơn giản để kiểm tra server
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Socket.IO xử lý sự kiện kết nối
io.on("connection", (socket) => {
  console.log("Client connected: ", socket.id);

  // Nhận sự kiện 'print_shape' từ client
  socket.on("print_shape", (shapeType) => {
    console.log(`Shape to print: ${shapeType}`);
    
    // Phát sự kiện đến tất cả các client khác, trừ client phát
    socket.broadcast.emit("print_shape", shapeType);
  });

  // Sự kiện ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

// Lắng nghe trên cổng do môi trường cung cấp hoặc cổng 5000 khi chạy local
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
s