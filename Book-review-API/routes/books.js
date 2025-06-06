const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBookById, searchBooks } = require('../controllers/books');
const auth = require('../middleware/auth');

// @route   POST api/books
// @desc    Add a new book
router.post('/', auth, addBook);

// @route   GET api/books
// @desc    Get all books
router.get('/', getBooks);

// @route   GET api/books/:id
// @desc    Get book by ID
router.get('/:id', getBookById);

// @route   GET api/books/search
// @desc    Search books
router.get('/search', searchBooks);

module.exports = router;