const express = require('express');
const loginController = require('../controllers/login.controller');

const loginRoutes = express.Router();

loginRoutes.post('/login', loginController.loginRequest);

module.exports = loginRoutes;