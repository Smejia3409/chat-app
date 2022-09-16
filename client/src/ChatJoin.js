import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import { getCookie } from "./cookies";

const socket = io.connect("http://localhost:5000");

function JoinChat() {
  const username = getCookie("username");
  const [room, setRoom] = useState("");
  const [displayChat, setDisplayChat] = useState(false);
  const [chatHistory, setChatHistory] = useState();
  const [status, setStatus] = useState("");

  let routeCall = async () => {
    try {
      const { data: getRoom } = await axios.get(
        `http://localhost:5000/chat/getRoom/${room}`
      );

      if (getRoom) {
        setChatHistory(getRoom);
        setDisplayChat(true);
        setStatus("");
        console.log(getRoom);
      }
    } catch (error) {
      console.log(error);
      setStatus("Room dosent exist please enter a valid room or create one");
      setDisplayChat(false);
    }
  };

  useEffect(() => {
    if (room !== "") {
      socket.emit("join_room", room);
    } else {
      console.log("room not there");
    }
  }, [chatHistory]);

  return (
    <div className="App">
      <h3>Join chat room</h3>
      <h4>Welcome back, {username}</h4>

      <input
        type="text"
        placeholder="Room id"
        onChange={(room) => setRoom(room.target.value)}
      />

      <button onClick={routeCall}>Join room</button>
      <p>{status}</p>

      {displayChat && (
        <Chat
          socket={socket}
          username={username}
          room={room}
          chatHistory={chatHistory}
        />
      )}
    </div>
  );
}

export default JoinChat;
