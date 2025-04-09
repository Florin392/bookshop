const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

//Public routes
router.get("/books", bookController.getAllBooks);
router.get("/books/isbn/:isbn", bookController.getBookByISBN);
router.get("/books/author/:author", bookController.getBooksByAuthor);
router.get("/books/title/:title", bookController.getBooksByTitle);
router.get("/books/:isbn/reviews", bookController.getBookReviews);

// Only for authenticated users
router.put("/books/:isbn/reviews", authMiddleware, bookController.addReview);
router.delete(
  "/books/:isbn/reviews",
  authMiddleware,
  bookController.deleteReview
);

module.exports = router;
