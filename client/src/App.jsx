import "./App.css";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Lottie from "lottie-react";

const SERVER_URL = "http://localhost:5000";

import dragon from "./assets/dragon.json";
import cat from "./assets/cat.json";
import cat2 from "./assets/cat2.json";
import dog1 from "./assets/dog1.json";

function App() {
  const [socket, setSocket] = useState(null);
  const [shape, setShape] = useState("");

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    // Nhận thông tin về hình từ server
    newSocket.on("print_shape", (shapeType) => {
      // Hiển thị hình tương ứng mà các máy khác nhận được
      setShape(shapeType);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Hàm gửi thông tin về hình lên server
  const handlePrintShape = (shapeType) => {
    if (socket) {
      socket.emit("print_shape", shapeType); // Gửi sự kiện 'print_shape' tới server
    }
  };

  return (
    <div className="App">
      <h1>Chọn hình để in</h1>
      <button onClick={() => handlePrintShape("circle")}>In hình con rồng</button>
      <button onClick={() => handlePrintShape("square")}>In hình con mèo</button>
      <button onClick={() => handlePrintShape("rectangle")}>
        In hình con chó
      </button>

      <div className="shape-container">
        <h2>Kết quả in:</h2>
        {/* {shape === "circle" && <div className="circle"></div>}
        {shape === "square" && <div className="square"></div>}
        {shape === "rectangle" && <div className="rectangle"></div>} */}
        {shape === "circle" && (
          <div className="">
            <Lottie animationData={dragon} loop={true} />
          </div>
        )}
        {shape === "square" && (
          <div className="">
            <Lottie animationData={cat} loop={true} />
          </div>
        )}
        {shape === "rectangle" && (
          <div className="">
            <Lottie animationData={dog1} loop={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;