const mongoose = require("mongoose");

// Schema for reviews
const ReviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Schema for books
const BookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: [ReviewSchema],
  },
  {
    timestamps: true,
  }
);

// add index for title, author
BookSchema.index({ title: "text", author: "text" });

module.exports = mongoose.model("Book", BookSchema);
