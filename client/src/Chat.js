import React, { useEffect, useState } from "react";

import "./style.css";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messageStyle, setMessageStyle] = useState("mymessage");

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        user: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
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
  }, [socket, messageList]);

  return (
    <div>
      <div className="chat-header">
        <p>Room: {room}</p>
      </div>

      <div className="chat-body" id="chat-body">
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
      <br />

      <div className="chat-footer">
        <input
          type="text"
          onChange={(m) => setMessage(m.target.value)}
          value={message}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}

export default Chat;
