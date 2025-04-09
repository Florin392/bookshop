const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // console.log("Error caught in asyncHandler:", error.message);
    let statusCode = 500;

    if (
      error.message === "No books available" ||
      error.message === "Book not found" ||
      error.message === "No books found by this title" ||
      error.message.includes("No book found") ||
      error.message.includes("not found")
    ) {
      statusCode = 404;
    } else if (error.message.includes("already exists")) {
      statusCode = 409;
    } else if (
      error.message === "Invalid username or password" ||
      error.message.includes("Authentication") ||
      error.message.includes("token")
    ) {
      statusCode = 401;
    } else if (error.message.includes("required")) {
      statusCode = 400;
    }

    if (error.statusCode) {
      statusCode = error.statusCode;
    }

    res.status(statusCode).json({
      status: "error",
      message: error.message || "An unexpected error occurred",
    });
  });

module.exports = asyncHandler;
