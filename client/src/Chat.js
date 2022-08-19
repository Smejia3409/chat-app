import React, { useState } from "react";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message != "") {
      const messageData = {
        room: room,
        user: username,
        message: message,
        time:
          new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };

  return (
    <div>
      <div className="chat-header">
        <p>live chat </p>
        <p>Hello, {username}</p>
        <p>Room: {room}</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input type="text" onChange={(m) => setMessage(m.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}

export default Chat;
