import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const createAccount = async (event) => {
    event.preventDefault();

    let user = await axios.post(
      `http://localhost:5000/user/register`,
      credentials
    );

    if (user) {
      console.log("Account creation successfull");
      console.log(user.data);

      document.cookie = `username=${user.data.username}`;
      document.cookie = `token=${user.data.token}`;
      navigate("/chat");
    }
  };

  return (
    <div>
      <h3>Account Registration</h3>
      <form onSubmit={createAccount}>
        <div>
          <h4>Username</h4>
          <input
            type="text"
            onChange={(username) => {
              setCredentials({
                ...credentials,
                username: username.target.value,
              });
            }}
          />
        </div>

        <div>
          <h4>Password</h4>
          <input
            type="text"
            onChange={(password) => {
              setCredentials({
                ...credentials,
                password: password.target.value,
              });
            }}
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Account{" "}
        </button>
      </form>
    </div>
  );
};

export default Register;
