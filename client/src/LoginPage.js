import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  // for redirecting
  const navigate = useNavigate();

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
      <p>
        <u>
          Don't have an account <br /> Click here to register
        </u>
      </p>
    </div>
  );
};

export default LoginPage;
