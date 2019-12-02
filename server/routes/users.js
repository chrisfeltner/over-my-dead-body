const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth');

// POST request for login user
router.post('/login', userController.loginUser);

// POST request for register user
router.post('/register', userController.registerUser);

// POST request for logout user
router.post('/logout', auth.authenticateWithExpiration, userController.logoutUser);

// POST request for confirm life
router.post('/confirmLife', auth.authenticateWithExpiration, userController.confirmLife);

// GET request for get user
router.get('/getUser', auth.authenticateWithExpiration, userController.getUser);

module.exports = router;