const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  // Add any other fields you need
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
