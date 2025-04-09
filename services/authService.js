const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/env");
const User = require("../models/Users");

// Register new user
const register = async (username, password) => {
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    password,
  });

  return {
    id: user._id,
    username: user.username,
    createdAt: user.createdAt,
  };
};

// Login user and generate JWT token
const login = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    message: "Login successfully",
    token,
  };
};

module.exports = {
  register,
  login,
};
