const express = require('express');

const saleController = require('../controllers/sale.controller');

const saleRoutes = express.Router();

saleRoutes.get('/sellers', saleController.findAllSeller);
saleRoutes.post('/createsale', saleController.createSale);
saleRoutes.get('/sale/:id', saleController.getSaleById);

module.exports = saleRoutes;
