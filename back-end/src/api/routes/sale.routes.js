const express = require('express');

const saleController = require('../controllers/sale.controller');

const saleRoutes = express.Router();

saleRoutes.get('/sellers', saleController.findAllSeller);
saleRoutes.post('/createsale', saleController.createSale);

module.exports = saleRoutes;
