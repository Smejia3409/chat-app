import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const createAccount = async (event) => {
    event.preventDefault();

    try {
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
        setStatus("");
      }
    } catch (error) {
      setStatus("Username already taken, Please try another one");
    }
  };

  return (
    <div className="registration-page">
      <Link to="/" className="rp-link link">
        ...Login page
      </Link>

      <p className="rp-sub">Join the new world of discovery</p>
      <p className="error-status">{status}</p>
      <form onSubmit={createAccount}>
        <div>
          <p className="rp-header">Username</p>
          <input
            className="form-input"
            type="text"
            onChange={(username) => {
              setCredentials({
                ...credentials,
                username: username.target.value,
              });
            }}
            placeholder="Enter username..."
          />
        </div>

        <div>
          <p className="rp-header">Password</p>
          <input
            className="form-input"
            type="text"
            onChange={(password) => {
              setCredentials({
                ...credentials,
                password: password.target.value,
              });
            }}
            placeholder="Enter Password..."
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
