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
      <div className="ChatJoinHeader">
        <div style={{ width: "90%" }}>
          <h3>Join chat room</h3>
          <h4>Welcome back, {username}</h4>
        </div>
        <CreateChat />
      </div>

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

const CreateChat = () => {
  const [btnName, setBtnName] = useState("");
  const [formDisplay, setFormDisplay] = useState("none");

  const openForm = () => {
    if (formDisplay === "none") {
      setFormDisplay("block");
    } else {
      setFormDisplay("none");
    }
  };

  const createRoom = async (event) => {
    event.preventDefault();

    try {
    } catch (error) {}
  };

  return (
    <div>
      <button className="createRoom" onClick={openForm}>
        Create room
      </button>
      <div className="createRoomContent" style={{ display: formDisplay }}>
        <form>
          <input type="text" placeholder="Enter a unique ID" />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default JoinChat;
