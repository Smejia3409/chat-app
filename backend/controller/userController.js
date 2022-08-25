const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        message: "please enter all the fields",
      });
      throw new Error("Please enter all fields");
    }

    //looks for username in database
    const checkUsername = await User.findOne({ username });

    if (checkUsername) {
      res.status(400).json({
        message: "user already exits",
      });
      throw new Error("User already exists");
    }

    console.log("register is contiuing");

    //hash password
    //encrypts password user enters
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("hashed passed");

    const user = await User.create({
      username: username,
      password: hashedPassword,
    });

    console.log("created passed");

    if (user) {
      res.status(200).json({
        username: username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({
        message: "Invalid data",
      });
      console.log("error");
      throw new Error("invalid user data");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //checks database if email exists
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        username: username,
        token: generateToken(user._id),
      });

      console.log("Login successfull");
    } else {
      res.status(400);
      res.json("invalid user");
      throw new Error("invalid user data");
    }
  } catch (error) {
    res.status(400).json({
      message: "Invaild credentials, please try again",
    });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, login };
