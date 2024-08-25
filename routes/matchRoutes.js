// src/routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

// Get potential matches
router.get('/matches', protect, matchController.getMatches);

// Create a new match
router.post('/matches', protect, matchController.createMatch);

// Update match status
router.put('/matches/:matchId', protect, matchController.updateMatch);

// Delete a match
router.delete('/matches/:matchId', protect, matchController.deleteMatch);

module.exports = router;
