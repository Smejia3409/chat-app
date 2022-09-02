const Chat = require("../model/chatModel");

const createChatRoom = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("Please enter room id");
    }

    const checkForRoom = await Chat.findOne({ id });

    if (checkForRoom) {
      throw new Error("Room already exist");
    }

    const room = await Chat.create({
      id: id,
      chat: [],
    });

    if (room) {
      res.status(200).json({
        id: id,
        chat: [{}],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createChatRoom };
