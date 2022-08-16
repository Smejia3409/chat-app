import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinroom = () => {
    if (username !== "" && room !== "") {
      // runs the socket io event created in the backend
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <h3>Join chat room</h3>
      <input
        type="text"
        placeholder="Name..."
        onChange={(name) => setUsername(name.target.value)}
      />
      <input
        type="text"
        placeholder="Room id"
        onChange={(room) => setRoom(room.target.value)}
      />

      <button onClick={joinroom}>Join room</button>
    </div>
  );
}

export default App;
