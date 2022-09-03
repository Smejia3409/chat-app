const express = require("express");
const router = express.Router();

const {
  createChatRoom,
  addMessageToRoom,
  getMessages,
} = require("../controller/chatController");

const { protect } = require("../middleware/authMiddleware");

router.post("/createChatRoom", createChatRoom);
router.put("/addMessage/:id", addMessageToRoom);
router.get("/getMessages/:id", getMessages);

module.exports = router;
