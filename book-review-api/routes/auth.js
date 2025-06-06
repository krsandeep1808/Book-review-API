const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth');

// @route   POST api/auth/signup
// @desc    Register user
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Login user
router.post('/login', login);

module.exports = router;