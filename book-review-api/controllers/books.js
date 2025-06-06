const Book = require('../models/Book');
const Review = require('../models/Review');

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;

  try {
    const book = new Book({ title, author, genre });
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all books with pagination and filtering
exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const query = {};
  
  if (author) query.author = author;
  if (genre) query.genre = genre;

  try {
    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get book by ID with reviews and average rating
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const reviews = await Review.find({ book: req.params.id })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    const averageRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      book,
      reviews,
      averageRating: averageRating.length ? averageRating[0].avgRating : 0
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Search books by title or author
exports.searchBooks = async (req, res) => {
  const { q } = req.query;

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } }
      ]
    });

    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};