const asyncHandler = require("../utils/asyncHandler");
const bookService = require("../services/bookService");

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await bookService.getAllBooks();
  res.status(200).json(books);
});

const getBookByISBN = asyncHandler(async (req, res) => {
  const { isbn } = req.params;
  const bookByISBN = await bookService.getBookByISBN(isbn);
  res.status(200).json(bookByISBN);
});

const getBooksByAuthor = asyncHandler(async (req, res) => {
  const { author } = req.params;
  const booksByAuthor = await bookService.getBooksByAuthor(author);
  res.status(200).json(booksByAuthor);
});

const getBooksByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const booksByTitle = await bookService.getBooksByTitle(title);
  res.status(200).json(booksByTitle);
});

const getBookReviews = asyncHandler(async (req, res) => {
  const { isbn } = req.params;
  const bookByISBN = await bookService.getBookByISBN(isbn);

  if (Object.keys(bookByISBN.reviews).length === 0) {
    return res.status(404).json({ message: "No reviews found for this book" });
  }

  res.status(200).json(bookByISBN.reviews);
});

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
