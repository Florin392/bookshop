const books = require("../data/booksdb");

const getAllBooks = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (Object.keys(books).length === 0) {
          reject(new Error("No books available"));
        } else {
          const bookList = Object.values(books);
          resolve(bookList);
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const book = books[isbn];
        if (!book) {
          reject(new Error("Book not found"));
        } else {
          resolve(book);
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

const getBooksByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const booksByAuthor = Object.values(books).filter(
          (book) => book.author.toLowerCase() === author.toLowerCase()
        );

        if (booksByAuthor.length === 0) {
          reject(new Error("No books found by this author"));
        } else {
          resolve(booksByAuthor);
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

const getBooksByTitle = (title) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const booksByTitle = Object.values(books).filter(
          (book) => book.title.toLowerCase() === title.toLowerCase()
        );

        if (booksByTitle.length === 0) {
          reject(new Error("No books found by this title"));
        } else {
          resolve(booksByTitle);
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

const addReview = (isbn, username, review) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const book = books[isbn];
        if (!book) {
          reject(new Error("Book not found"));
        } else {
          book.reviews[username] = review;
          resolve(book);
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteReview = (isbn, username) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const book = books[isbn];
        if (!book) {
          reject(new Error("Book not found"));
        } else if (!book.reviews[username]) {
          reject(new Error("Review not found for this user"));
        } else {
          // Delete the review
          delete book.reviews[username];
          resolve(book);
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  addReview,
  deleteReview,
};
