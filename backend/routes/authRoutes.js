// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, loginUser } = require('../controllers/authController');

// @route    POST api/auth/signup
// @desc     Register a new user
// @access   Public
router.post('/signup', signup);

// @route    POST api/auth/login
// @desc     Login user & get token
// @access   Public
router.post('/login', loginUser);

module.exports = router;
