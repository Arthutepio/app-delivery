const express = require('express');

const saleController = require('../controllers/sale.controller');

const saleRoutes = express.Router();

saleRoutes.get('/sellers', saleController.findAllSeller);

module.exports = saleRoutes;
