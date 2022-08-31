import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { getCookie } from "./cookies";

const LoginPage = () => {
  // for redirecting
  const navigate = useNavigate();

  let loggedin = getCookie("username");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (credentials.username === "" || credentials.password === "") {
        throw new Error({
          message: "Please enter all the input fields",
        });
      }

      let user = await axios.post(
        "http://localhost:5000/user/login",
        credentials
      );

      if (user) {
        console.log("login successfull");
        console.log(user.data);
        document.cookie = `username=${user.data.username}`;
        document.cookie = `token=${user.data.token}`;
        navigate("/chat");
      }
    } catch (error) {
      setStatus("Invalid username or password, please Try again");
    }
  };

  useEffect(() => {
    //if user has prevoiurly signed in it redirects you to chat room
    if (loggedin) {
      navigate("/chat");
    }
  });

  return (
    <div>
      <h2>MyChats</h2>

      <div>
        <p>{status}</p>
        <h4>Username</h4>
        <input
          type="text"
          onChange={(username) =>
            setCredentials({ ...credentials, username: username.target.value })
          }
        />
      </div>

      <div>
        <h4>Password</h4>
        <input
          type="text"
          onChange={(password) =>
            setCredentials({ ...credentials, password: password.target.value })
          }
        />
      </div>

      <button onClick={handleLogin}>Login</button>
      <br />
      <Link to="/registration">
        <u>
          Don't have an account <br /> Click here to register
        </u>
      </Link>
    </div>
  );
};

export default LoginPage;
