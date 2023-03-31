const express = require('express');
const productController = require('../controllers/product.controller');

const productRoutes = express.Router();

productRoutes.get('/products', productController.productRequest);

module.exports = productRoutes;
