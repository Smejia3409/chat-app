const express = require("express");
const router = express.Router();

const {
  createChatRoom,
  addMessageToRoom,
  getRoom,
} = require("../controller/chatController");

const { protect } = require("../middleware/authMiddleware");

router.post("/createChatRoom", createChatRoom);
router.put("/addMessage/:id", addMessageToRoom);
router.get("/getRoom/:id", getRoom);

module.exports = router;
