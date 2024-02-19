// controllers/userController.js

const Cartservices = require('../services/carts.services');

async function createCart(req, res) {
  try {
    const Cart = await Cartservices.createCart(req.body);
    res.json(Cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getCart(req, res) {
  try {
    const Cart = await Cartservices.getCarts();
    res.json(Cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getCartById(req, res) {
  try {
    const Cart = await Cartservices.getCartById(req.params.id);
    res.json(Cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateCart(req, res) {
  try {
    const Cart = await Cartservices.updateCart(req.params.id, req.body);
    res.json(Cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCarts(req, res) {
  try {
    const Cart = await Cartservices.deleteCarts(req.params.id);
    res.json(Cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
// controllers/cartsController.js

async function getCartProductsByUser(req, res) {
  try {
    const { userId, userDetailedId } = req.params;
    const cartProducts = await Cartservices.getCartsByUser(userId, userDetailedId);
    res.json(cartProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCartByUserId(req, res) {
  
  try {
    const { userId } = req.params;
    console.log("User ID:", userId);
    const cart = await Cartservices.getCartsByUserId(userId);
    console.log(cart);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { createCart, getCart, getCartById, updateCart, deleteCarts, getCartProductsByUser, getCartByUserId };
