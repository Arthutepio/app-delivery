const express = require('express');
const registerController = require('../controllers/registerController');

const registerRoutes = express.Router();

registerRoutes.post('/register', registerController.createUser);
registerRoutes.post('/registeradm', registerController.createUserAdm);

module.exports = registerRoutes;
