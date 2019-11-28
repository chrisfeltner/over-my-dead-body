const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST request for login user
router.post('/login', userController.loginUser);

// POST request for register user
router.post('/register', userController.registerUser);

// POST request to test connection, dev only
router.post('/test', userController.test);

module.exports = router;