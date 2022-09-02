const express = require("express");
const router = express.Router();

const { createChatRoom } = require("../controller/chatController");

const { protect } = require("../middleware/authMiddleware");

router.post("/createChatRoom", createChatRoom);

module.exports = router;
