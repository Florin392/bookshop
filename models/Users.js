const bcrypt = require("bcrypt");
const users = [];

const findByUsername = (username) => {
  return users.find((user) => user.username === username) || null;
};

const isValidUser = (username, password) => {
  const user = users.find((user) => user.username === username);
  if (!user) return null;

  return bcrypt.compareSync(password, user.password) ? user : null;
};

const addUser = (username, password) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

module.exports = {
  users,
  findByUsername,
  isValidUser,
  addUser,
};
