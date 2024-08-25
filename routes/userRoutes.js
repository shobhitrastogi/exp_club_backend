// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware.js/authMiddleware');
// const { protect } = require('../middleware/authMiddleware');

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// Get User Profile (protected route)
router.get('/profile', protect, userController.getProfile);

module.exports = router;
