// routes/userRoutes.js

const express = require('express');
const { cartsController } = require('../controller/index.js');
const { authenticateToken } = require('../../../middleware/authenticateUser.js');

const router = express.Router();


// Create user
router.post('/addcarts', cartsController.createCart);

// Get all users
router.get('/carts', cartsController.getCart);

// Get user by ID
// router.get('/carts/:id', cartsController.getCartById);

router.get('/carts/:userId', cartsController.getCartByUserId);

router.get('/carts/:userId/:userDetailedId', cartsController.getCartProductsByUser);
// Update user
router.put('/carts/:id', cartsController.updateCart);

// Delete user
router.delete('/carts/:id', cartsController.deleteCarts);

module.exports = router;
