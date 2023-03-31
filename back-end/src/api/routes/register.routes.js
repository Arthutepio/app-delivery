const express = require('express');
const registerController = require('../controllers/registerController');

const registerRoutes = express.Router();

registerRoutes.post('/register', registerController.createUser);

module.exports = registerRoutes;
