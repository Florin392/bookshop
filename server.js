const express = require("express");
const session = require("express-session");
const { PORT, SESSION_SECRET } = require("./config/env");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const connectDB = require("./config/db");
const { seedBooks } = require("./services/bookService");

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Routes
app.use("/api", bookRoutes);
app.use("/api", authRoutes);

// Error handling for middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    await seedBooks();
    console.log("Database seeded successfully");

    // Only start the server after successful DB connection
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Error initializing database:", error.message);
    process.exit(1);
  }
};

startServer();

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
