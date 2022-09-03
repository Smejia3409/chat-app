const express = require("express");
const router = express.Router();

const {
  createChatRoom,
  addMessageToRoom,
} = require("../controller/chatController");

const { protect } = require("../middleware/authMiddleware");

router.post("/createChatRoom", createChatRoom);
router.put("/addMessage/:id", addMessageToRoom);

module.exports = router;
