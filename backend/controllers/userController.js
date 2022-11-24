const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const handler = require("express-async-handler");

const registerUser = handler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(403);
    throw new Error("please fill in all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  User.create({ name: name, email: email, password: hashedPassword })
    .then((user) => {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    })
    .catch((error) => {
      res.status(400);
      throw new Error(error);
    });
});

const authenticateUser = handler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please enter all required fields");
  }
  const user = await User.findOne({  email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      name: user.name,
      email: user.email,
      id: user.id,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

const getMe = handler( async (req, res) => {


  res.status(200).json(req.user);
});

module.exports = { registerUser, authenticateUser, getMe };
