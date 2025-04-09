const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env");

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB at:", MONGODB_URI);
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected successfully at: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    console.error("Full error details:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
