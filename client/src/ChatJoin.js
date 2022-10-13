import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import { getCookie } from "./cookies";
import { useNavigate } from "react-router-dom";
import { onEnter } from "./fn";

const socket = io.connect("http://localhost:5000");

function JoinChat() {
  const username = getCookie("username");
  const [room, setRoom] = useState("");
  const [displayChat, setDisplayChat] = useState(false);
  const [chatHistory, setChatHistory] = useState();
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  let routeCall = async (event) => {
    event.preventDefault();
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

  const logout = () => {
    document.cookie = `username=`;
    document.cookie = `token=`;

    navigate("/");
  };

  const inputfn = (id, fn) => {
    let i = document.querySelectorAll(`.${id}`).forEach();
  };

  useEffect(() => {
    // if (!getCookie("user")) {
    //   navigate("/");
    // }

    if (room !== "") {
      socket.emit("join_room", room);
    } else {
      console.log("room not there");
    }
  }, [chatHistory]);

  return (
    <div className="app">
      <div className="ChatJoinHeader app-div">
        <div style={{ width: "90%" }}>
          <h3 className="cjh-header">Join chat room</h3>
          <h4 className="cjh-subheader">Welcome back, {username}</h4>
        </div>

        <div>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
          <CreateChat />
        </div>
      </div>

      <div className="app-div">
        <form onSubmit={routeCall} id="form">
          <p className="chat-room-suggestion">Test room 1 or 2</p>
          <input
            type="text"
            placeholder="Room id"
            className="form-input"
            onChange={(room) => setRoom(room.target.value)}
          />
          <br />

          <button type="submit" className="joinroom-btn">
            Join room
          </button>
        </form>
      </div>

      <div className="app-div">
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
    </div>
  );
}

const CreateChat = () => {
  const [btnName, setBtnName] = useState("Create Room");
  const [formDisplay, setFormDisplay] = useState("none");
  const [roomNum, setRoomNum] = useState("");
  const [status, setStatus] = useState("");

  const openForm = () => {
    if (formDisplay === "none") {
      setBtnName("X");
      setFormDisplay("block");
    } else {
      setBtnName("Create Room");
      setFormDisplay("none");
    }
  };

  const createRoom = async (event) => {
    event.preventDefault();

    try {
      const { data: createRoom } = await axios.post(
        `http://localhost:5000/chat/createRoom`,
        { id: roomNum }
      );

      console.log(createRoom);
      console.log(`The new room is: ${roomNum}`);
      setRoomNum("");
      setStatus("");
    } catch (error) {
      console.log("Room has already been created");
      setStatus("This Id is already being used");
    }
  };

  return (
    <div>
      <p>{status}</p>
      <button className="createRoom" onClick={openForm}>
        {btnName}
      </button>
      <div className="createRoomContent" style={{ display: formDisplay }}>
        <form onSubmit={createRoom}>
          <input
            type="text"
            placeholder="Enter a unique ID"
            onChange={(room) => {
              setRoomNum(room.target.value);
            }}
            value={roomNum}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default JoinChat;
