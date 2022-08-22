import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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

      setMessage("");
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
        <p>live chat </p>
        <p>Hello, {username}</p>
        <p>Room: {room}</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            <>
              <div>
                <h2>{messageContent.user}</h2>
                <h5>{messageContent.message}</h5>
              </div>
            </>
          );
        })}
      </div>
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
