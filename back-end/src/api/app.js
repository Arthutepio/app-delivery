const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/login.routes');
const productRoutes = require('./routes/product.routes');
const ErrorHandler = require('./middlewares/ErrorHandler');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(loginRoutes);
app.use(productRoutes);
app.use(ErrorHandler.handle);

module.exports = app;
