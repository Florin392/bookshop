const asyncHandler = require("../utils/asyncHandler");
const bookService = require("../services/bookService");

// Get all books
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await bookService.getAllBooks();
  res.status(200).json(books);
});

// Get book by ISBN
const getBookByISBN = asyncHandler(async (req, res) => {
  const { isbn } = req.params;
  const bookByISBN = await bookService.getBookByISBN(isbn);
  res.status(200).json(bookByISBN);
});

// Get books by author
const getBooksByAuthor = asyncHandler(async (req, res) => {
  const { author } = req.params;
  const booksByAuthor = await bookService.getBooksByAuthor(author);
  res.status(200).json(booksByAuthor);
});

// Get books by title
const getBooksByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const booksByTitle = await bookService.getBooksByTitle(title);
  res.status(200).json(booksByTitle);
});

// Get book reviews
const getBookReviews = asyncHandler(async (req, res) => {
  const { isbn } = req.params;
  const bookByISBN = await bookService.getBookByISBN(isbn);

  if (Object.keys(bookByISBN.reviews).length === 0) {
    return res.status(404).json({ message: "No reviews found for this book" });
  }

  res.status(200).json(bookByISBN.reviews);
});

// Add a review
const addReview = asyncHandler(async (req, res) => {
  const { isbn } = req.params;
  const { review } = req.query;
  const { username } = req.user;

  if (!review) {
    return res.status(400).json({ message: "Review content is required" });
  }

  const updatedBook = await bookService.addReview(isbn, username, review);

  res.status(201).json({
    message: "Review added/updated successfully",
    book: updatedBook.title,
    user: username,
  });
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  const { isbn } = req.params;
  const { username } = req.user;

  const updatedBook = await bookService.deleteReview(isbn, username);

  res.status(200).json({
    message: "Review deleted successfully",
    book: updatedBook.title,
  });
});

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReviews,
  addReview,
  deleteReview,
};
