const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const User = require("../models/Users");

// Authentication middleware to check JWT token
const authMiddleware = async (req, res, next) => {
  try {
    // check authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message:
          "Authentication required. Please provide a valid Bearer token.",
      });
    }

    const token = authHeader.split(" ")[1]; // extract token

    const decoded = jwt.verify(token, JWT_SECRET); // check token

    const user = await User.findOne({ username: decoded.username }); // check if user exists

    if (!user) {
      return res.status(401).json({
        message: "The user associated with this token is no longer exists",
      });
    }

    req.user = decoded; // add user info to request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }

    return res
      .status(401)
      .json({ message: "Invalid token. Please login again." });
  }
};

module.exports = authMiddleware;
