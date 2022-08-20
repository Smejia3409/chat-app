const express = require("express");
const app = express();

const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

//to handle cors issues
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET, POST"],
  },
});

//socket.io listen for events
//connection is a event in socket
io.on("connection", (socket) => {
  console.log(`socket io: ${socket.id}`);

  // socket event created
  socket.on("join_room", (id) => {
    socket.join(id);
    console.log(`user: ${socket.id} ,  joined room: ${id}`);
  });

  //send message event
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
  });
});

server.listen(5000, () => {
  console.log("server running on port 5000");
});
