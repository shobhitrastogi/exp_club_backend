// src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect } = require('../middleware.js/authMiddleware');
// const { protect } = require('../middleware/authMiddleware');

// Get all books (public route)
router.get('/books', bookController.getAllBooks);

// Get a single book by ID (public route)
router.get('/books/:id', bookController.getBookById);

// Add a new book (protected route)
router.post('/books', protect, bookController.addBook);

// Update a book (protected route)
router.put('/books/:id', protect, bookController.updateBook);

// Delete a book (protected route)
router.delete('/books/:id', protect, bookController.deleteBook);

module.exports = router;
