// services/userService.js

const Product = require('../../../models/products')
const User = require('../../../models/auth');

async function createProducts(body) {
  try {
    const products = await Product.create(body);
    console.log(products); // Log userDetails if creation is successful
    return products;
  } catch (error) {
    console.error(error); // Log the actual error message
    throw new Error('Error creating Product');
  }
}

async function getProducts() {
  try {
    const Products = await Product.findAll();
    return Products;
  } catch (error) {
    throw new Error('Error fetching Product');
  }
}

async function getProductById(id) {
  try {
    const products = await Product.findByPk(id, 
    //     {
    //   include: User // Include the associated User model
    // }
    );
    if (!products) throw new Error('products not found');
    return products;
  } catch (error) {
    throw new Error('Error fetching  products');
  }
}

async function updateProducts(id, updates) {
  try {
    const products = await Product.findByPk(id);
    if (!products) throw new Error('products not found');
    await products.update(updates);
    return products;
  } catch (error) {
    throw new Error('Error updating products');
  }
}

async function deleteProducts(id) {
  try {
    const products = await Product.findByPk(id);
    if (!products) throw new Error('products not found');
    await products.destroy();
    return products;
  } catch (error) {
    throw new Error('Error deleting products');
  }
}

module.exports = { createProducts, getProductById, getProducts, updateProducts, deleteProducts };
