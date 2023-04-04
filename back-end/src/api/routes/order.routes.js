const express = require('express');

const orderController = require('../controllers/order.controller');

const orderRoutes = express.Router();

orderRoutes.get('/orders/user', orderController.findAllOrders);

module.exports = orderRoutes;
