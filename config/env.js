require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret_key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/bookshop",
  SESSION_SECRET: process.env.SESSION_SECRET,
};
