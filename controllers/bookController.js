// src/controllers/bookController.js
const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('user', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('user', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  
  try {
    const newBook = new Book({
      title,
      author,
      genre,
      user: req.user._id,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { title, author, genre } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user is the owner
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user is the owner
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await book.remove();
    res.json({ message: 'Book removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
