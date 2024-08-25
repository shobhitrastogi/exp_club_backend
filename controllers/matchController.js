// src/controllers/matchController.js
const Match = require('../models/Match');
const Book = require('../models/Book');
const User = require('../models/User');

// Get potential matches based on user's book preferences
exports.getMatches = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available from authentication middleware
    const userBooks = await Book.find({ user: userId });
    const matches = await Match.find({ user: userId }).populate('book').populate('user');
    
    // Simple example of matching logic (to be improved based on your requirements)
    const potentialMatches = [];

    for (const book of userBooks) {
      const otherBooks = await Book.find({ genre: book.genre }).where('_id').ne(book._id);
      for (const otherBook of otherBooks) {
        if (!matches.some(match => match.book.equals(otherBook._id))) {
          potentialMatches.push({
            user: otherBook.user,
            book: otherBook,
          });
        }
      }
    }

    res.json(potentialMatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    // Check if the match already exists
    const existingMatch = await Match.findOne({ user: userId, book: bookId });
    if (existingMatch) {
      return res.status(400).json({ message: 'Match already exists.' });
    }

    const newMatch = new Match({
      user: userId,
      book: bookId,
    });

    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update match status
exports.updateMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found.' });
    }

    match.status = status;
    await match.save();
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found.' });
    }

    await match.remove();
    res.json({ message: 'Match removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
