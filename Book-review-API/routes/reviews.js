const express = require('express');
const router = express.Router();
const { addReview, updateReview, deleteReview } = require('../controllers/reviews');
const auth = require('../middleware/auth');

// @route   POST api/books/:id/reviews
// @desc    Add a review
router.post('/books/:id/reviews', auth, addReview);

// @route   PUT api/reviews/:id
// @desc    Update a review
router.put('/:id', auth, updateReview);

// @route   DELETE api/reviews/:id
// @desc    Delete a review
router.delete('/:id', auth, deleteReview);

module.exports = router;