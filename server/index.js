const express = require("express");
const app = express();

const http = require("http");
const cors = require("cors");

//to handle cors issues
app.use(cors());

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("server running on port 5000");
});
