const express = require('express');

const orderController = require('../controllers/order.controller');

const orderRoutes = express.Router();

orderRoutes.get('/orders/:id', orderController.findAllOrders);
orderRoutes.get('/orders/details/:id', orderController.findOneDetails);

module.exports = orderRoutes;
