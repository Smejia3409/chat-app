const Chat = require("../model/chatModel");

const createChatRoom = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("Please enter room id");
    }

    const checkForRoom = await Chat.findOne({ id });

    if (checkForRoom) {
      res.status(400).json({
        message: "Room has already been created",
      });
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

const addMessageToRoom = async (req, res) => {
  try {
    const { chatBody, user } = req.body;

    //object being appened to the chat array in room atribute
    const messageBody = {
      user: user,
      message: chatBody,
      time: new Date().toLocaleString(),
    };

    const room = await Chat.find({
      id: req.params.id,
    });

    if (!room) {
      res.status(400).json({
        message: "This room doesnt exit",
      });
      throw new Error("This room doesnt exist");
    }

    console.log(room[0]._id);

    //updated the room chat log
    const message = await Chat.findByIdAndUpdate(
      { _id: room[0]._id },
      { $push: { chat: messageBody } }
    );
    if (message) {
      res.status(200).json({
        message: "message sent",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (req, res) => {
  try {
    //finds chat room using id

    const room = await Chat.find({
      id: req.params.id,
    });

    if (!room) {
      res.status(400).json({
        message: "This room doesnt exit",
      });
      throw new Error("This room doesnt exist");
    } else {
      res.status(200).json({
        chat: room[0].chat,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createChatRoom, addMessageToRoom, getMessages };
