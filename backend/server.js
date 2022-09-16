const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();

//to handle cors issues
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
//for database connection
const connectDb = require("./config/db");
connectDb();

//for route connection
const userRouter = require("./routes/users");
const chatRouter = require("./routes/chatRoutes");

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
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
  });
});

const port = process.env.PORT || 5000;

app.use("/user", userRouter);
app.use("/chat", chatRouter);
//to get user with id
app.post("/:id");

server.listen(port, () => {
  console.log("server running on port 5000");
});
