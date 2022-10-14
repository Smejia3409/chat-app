import axios from "axios";
import React, { useEffect, useState } from "react";

import "./style.css";

function Chat({ socket, username, room, chatHistory }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState(chatHistory.chat);
  const [messageStyle, setMessageStyle] = useState("mymessage");

  const sendMessage = async () => {
    if (message !== "") {
      console.log(room);
      const messageData = {
        room: room,
        user: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      const socketData = {
        room: room,
        user: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await axios.put(`http://localhost:5000/chat/addMessage/${room}`, {
        username: username,
        message: message,
      });

      await socket.emit("send_message", socketData);

      setMessageList([...messageList, messageData]);

      setMessage("");
      let chat_body = document.getElementById("chat-body");
      chat_body.scrollTop = chat_body.scrollHeight;
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //adds new messages to list
      console.log(data);
      setMessageList([...messageList, data]);
      setMessage("");
    });

    var element = document.getElementById("chat-body");
    element.scrollTop = element.scrollHeight;
  }, [socket, messageList]);

  const [chatClass, setChatClass] = useState("chat");
  const [chatBody, setChatBody] = useState("chat-body");
  const [fullBtn, setFullBtn] = useState("Full Screen");

  const chatClassChange = () => {
    if (chatClass === "chat") {
      setChatClass("chat-full");
      setChatBody("chat-body-full");
      setFullBtn("Minimize");
    } else {
      setChatClass("chat");
      setChatBody("chat-body");
      setFullBtn("Full Screen");
      console.log("btn clicked");
    }
  };

  return (
    <div className={chatClass}>
      <button onClick={chatClassChange} className="full-btn">
        {fullBtn}
      </button>

      <div className="chat-header chat-div">
        <p>Room: {room}</p>
      </div>

      <div className={chatBody} id="chat-body">
        {messageList.map((messageContent) => {
          return (
            <div className="message-container">
              <div
                className="message"
                id={
                  messageContent.user === username
                    ? "mymessage"
                    : "othermessage"
                }
              >
                <h4>{messageContent.message}</h4>
                <h6>
                  <b>{messageContent.user}</b>
                </h6>
                <h6>{messageContent.time}</h6>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-footer chat-div">
        <input
          type="text"
          onChange={(m) => setMessage(m.target.value)}
          value={message}
          className="msg-input"
        />
        <button onClick={sendMessage} className="send-btn">
          Send Message
        </button>
      </div>
    </div>
  );
}

export default Chat;
