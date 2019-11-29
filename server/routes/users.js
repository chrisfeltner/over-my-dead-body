const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST request for login user
router.post('/login', userController.loginUser);

// POST request for register user
router.post('/register', userController.registerUser);

// POST request for logout user
router.post('/logout', userController.authenticate, userController.logoutUser);

// GET request for get user
router.get('/getUser', userController.authenticate, userController.getUser);

module.exports = router;