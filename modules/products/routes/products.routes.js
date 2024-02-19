// routes/userRoutes.js

const express = require('express');
const { productsController } = require('../controller.js');
const router = express.Router();


// Create user
router.post('/addproduct', productsController.createProducts);

// Get all users
router.get('/products', productsController.getProducts);

// Get user by ID
router.get('/products/:id', productsController.getProductsById);

// Update user
router.put('/products/:id', productsController.updateProducts);

// Delete user
router.delete('/products/:id', productsController.deleteProducts);

module.exports = router;
