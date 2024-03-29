const express = require('express');
const router = express.Router();
const userController = require('../controller/auth.controller');

// Create a new user
router.post('/users/signup', userController.createUser);

// Login user
router.post('/users/login', userController.loginUser);

// Get all users
router.get('/users', userController.getUser);

router.get('/user/cart/:userId', userController.getCartByUserId);

router.post('/sentotp', userController.requestPasswordReset);

router.post('/verifyotp', userController.verifyOTPAndResetPassword);

module.exports = router;
