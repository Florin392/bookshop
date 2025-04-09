const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message:
          "Authentication required. Please provide a valid Bearer token.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

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
