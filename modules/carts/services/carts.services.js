// services/userService.js

const Cart = require('../../../models/carts')
const User = require('../../../models/auth');
const userDetails = require('../../../models/userDetails');
const { sendNotification } = require('../../notification/services/notification.services');

async function createCart(body) {
  try {
    const carts = await Cart.create(body);
    console.log(carts); // Log userDetails if creation is successful
    await sendNotification(body.userId, body.produdtName);
    return carts;
  } catch (error) {
    console.error(error); // Log the actual error message
    throw new Error('Error creating carts');
  }
}

async function getCarts() {
  try {
    const carts = await Cart.findAll();
    return carts;
  } catch (error) {
    throw new Error('Error fetching carts');
  }
}

async function getCartById(id) {
    try {
      const carts = await Cart.findByPk(id,  {
        include: [
          { model: User },
          { model: userDetails } // Include the associated userDetails model
        ]
      });
      if (!carts) throw new Error('Cart not found');
      return carts;
    } catch (error) {
      throw new Error('Error fetching cart');
    }
  }

  

async function updateCart(id, updates) {
  try {
    const carts = await Cart.findByPk(id);
    if (!carts) throw new Error('Cart not found');
    await carts.update(updates);
    return carts;
  } catch (error) {
    throw new Error('Error updating Cart');
  }
}

async function deleteCarts(id) {
  try {
    const carts = await Cart.findByPk(id);
    if (!carts) throw new Error('carts not found');
    await carts.destroy();
    return carts;
  } catch (error) {
    throw new Error('Error deleting carts');
  }
}

async function getCartsByUser(userId, userDetailedId) {
  try {
      const carts = await Cart.findAll({
          where: {
              userId,
              userDetailedId
          }
      });
      return carts;
  } catch (error) {
      throw new Error('Error fetching carts for user');
  }
}

async function getCartsByUserId(userId) {
  try {
    const carts = await Cart.findAll({ 
      where: { userId },
      include: 'userDetails' // Include the userDetails association
    });
    if (!carts || carts.length === 0) {
      throw new Error("No carts found for this user");
    }
    console.log(carts);
    return carts;
  } catch (error) {
    throw new Error("Error fetching carts by user ID");
  }
}

module.exports = { createCart, getCarts, getCartById, updateCart, deleteCarts, getCartsByUser, getCartsByUserId };
