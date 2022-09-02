const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  chat: {
    type: {},
    require: false,
  },
});

module.exports = mongoose.model("Chat", chatModel);
