import axios from "axios";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import { getCookie } from "./cookies";

const socket = io.connect("http://localhost:5000");

function JoinChat() {
  const username = getCookie("username");
  const [room, setRoom] = useState("");
  const [displayChat, setDisplayChat] = useState(false);

  const joinroom = () => {
    let routeCall = async () => {
      const { data: getMessages } = await axios.get(
        `http://localhost:5000/chat/getMessages/${room}`
      );

      const { data: createRoom } = await axios.post(
        `http://localhost:5000/chat/createChatRoom`,
        { id: room }
      );
    };

    if (room !== "") {
      // runs the socket io event created in the backend
      socket.emit("join_room", room);
      setDisplayChat(true);
      routeCall();
    }
  };

  return (
    <div className="App">
      <h3>Join chat room</h3>
      <h4>Welcome back, {username}</h4>

      <input
        type="text"
        placeholder="Room id"
        onChange={(room) => setRoom(room.target.value)}
      />

      <button onClick={joinroom}>Join room</button>

      {displayChat && <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}

export default JoinChat;
