const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authControllers/login');
const { register } = require('../controllers/authControllers/signup');
const { getUserProfile } = require('../controllers/authControllers/getUserProfile');
const { verifyUser } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyUser, getUserProfile);

module.exports = router;
