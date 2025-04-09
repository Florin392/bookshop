const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/env");
const User = require("../models/Users");

const register = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (User.findByUsername(username)) {
          reject(new Error("Username already exists"));
        } else {
          const newUser = User.addUser(username, password);
          resolve(newUser);
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const user = User.isValidUser(username, password);

        if (!user) {
          reject(new Error("Invalid username or password"));
        } else {
          const token = jwt.sign({ username: user.username }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
          });

          resolve({
            message: "Login successful",
            token,
          });
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  register,
  login,
};
