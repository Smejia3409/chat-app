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
      <p className="lp-name">MyChats</p>

      <div className="lp-container">
        <div>
          <p>{status}</p>
          <p className="form-label">Username</p>
          <input
            className="form-input"
            type="text"
            onChange={(username) =>
              setCredentials({
                ...credentials,
                username: username.target.value,
              })
            }
            placeholder="Enter username"
          />
        </div>

        <div>
          <p className="form-label">Password</p>
          <input
            className="form-input"
            type="text"
            onChange={(password) =>
              setCredentials({
                ...credentials,
                password: password.target.value,
              })
            }
            placeholder="Enter password"
          />
        </div>

        <button onClick={handleLogin}>Login</button>
        <br />
        <Link to="/registration" className="">
          <u>
            Don't have an account <br /> Click here to register
          </u>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
