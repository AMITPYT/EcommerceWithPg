// controllers/userController.js

const ProductsServices = require('../services/products.services');

async function createProducts(req, res) {
  try {
    const { phoneNumber, dateOfBirth, address } = req.body;
    const products = await ProductsServices.createProducts(req.body);
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getProducts(req, res) {
  try {
    const products = await ProductsServices.getProducts();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getProductsById(req, res) {
  try {
    const products = await ProductsServices.getProductById(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateProducts(req, res) {
  try {
    const products = await ProductsServices.updateProducts(req.params.id, req.body);
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteProducts(req, res) {
  try {
    const Products = await ProductsServices.deleteProducts(req.params.id);
    res.json(Products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createProducts, getProducts, getProductsById, updateProducts, deleteProducts };
