const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/authService");

// Register a new user
const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Both username and password are required",
    });
  }

  if (!username) {
    return res.status(400).json({
      message: "Username is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Passwrod is required",
    });
  }

  if (username.length < 3) {
    return res.status(400).json({
      message: "Username must be at least 3 characters long",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  await authService.register(username, password);

  res.status(201).json({
    message: "User successfully registered. Now you can login",
  });
});

// Login a user
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const result = await authService.login(username, password);

  res.status(200).json(result);
});

module.exports = {
  register,
  login,
};
