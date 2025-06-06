const Review = require('../models/Review');
const Book = require('../models/Book');

// Add a review
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      book: req.params.id,
      user: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this book' });
    }

    const review = new Review({
      book: req.params.id,
      user: req.user.id,
      rating,
      comment
    });

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the review belongs to the user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the review belongs to the user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await review.remove();
    res.json({ message: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};