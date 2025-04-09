const Book = require("../models/Book");

const getAllBooks = async () => {
  const books = await Book.find({}).sort({ createdAt: -1 });

  if (books.length === 0) {
    throw new Error("No books found");
  }

  return books;
};

const getBookByISBN = async (isbn) => {
  const book = await Book.findOne({ isbn });

  if (!book) {
    throw new Error(`Book with ${isbn} not found`);
  }

  return book;
};

const getBooksByAuthor = async (author) => {
  const books = await Book.find({
    author: { $regex: new RegExp(author, "i") },
  });

  if (books.length === 0) {
    throw new Error("No books found by this author");
  }
  return books;
};

const getBooksByTitle = async (title) => {
  const books = await Book.find({
    title: { $regex: new RegExp(title, "i") },
  });

  if (books.length === 0) {
    throw new Error("No books found by this title");
  }
  return books;
};

const addReview = async (isbn, username, review) => {
  const book = await Book.findOne({ isbn });

  if (!book) {
    throw new Error("Book not found");
  }

  // check if user already has a review
  const existingReviewIndex = book.reviews.findIndex(
    (review) => review.username === username
  );

  if (existingReviewIndex >= 0) {
    // update existing review
    book.reviews[existingReviewIndex].content = review;
  } else {
    // add review
    book.reviews.push({ username, content: review });
  }

  await book.save();
  return book;
};

const deleteReview = async (isbn, username) => {
  const book = await Book.findOneAndUpdate(
    { isbn },
    /* 
    $pull - operator to remove elements from array that specify the condition

    */
    { $pull: { reviews: { username } } },
    { new: true } // update document and return
  );

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

const seedBooks = async () => {
  const count = await Book.countDocuments();

  if (count === 0) {
    const initialBooks = [
      {
        isbn: "1",
        title: "Book Title 1",
        author: "Author 1",
        reviews: [{ username: "user1", content: "amazing book" }],
      },
      {
        isbn: "2",
        title: "Lorem ipsum dolor",
        author: "Author 2",
        reviews: [],
      },
      {
        isbn: "3",
        title: "Aliquam malesuada ornare",
        author: "Author 3",
        reviews: [],
      },
      {
        isbn: "4",
        title: "Quisque condimentum elementum",
        author: "Author 4",
        reviews: [],
      },
      {
        isbn: "5",
        title: "Aliquam tincidunt",
        author: "Author 1",
        reviews: [],
      },
    ];

    await Book.insertMany(initialBooks);
    console.log("Databse seeded with initial books");
  }
};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  addReview,
  deleteReview,
  seedBooks,
};
