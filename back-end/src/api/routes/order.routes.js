const express = require('express');

const orderController = require('../controllers/order.controller');

const orderRoutes = express.Router();

orderRoutes.get('/orders/:id', orderController.findAllOrders);

module.exports = orderRoutes;
