const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/login.routes');
const registerRoutes = require('./routes/register.routes');
const ErrorHandler = require('./middlewares/ErrorHandler');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(loginRoutes);
app.use(registerRoutes);
app.use(ErrorHandler.handle);

module.exports = app;
