const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./middlewares/ErrorHandler'); 
const loginRoutes = require('./routes/login.routes');
const productRoutes = require('./routes/product.routes');
const registerRoutes = require('./routes/register.routes');
const saleRoutes = require('./routes/sale.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(loginRoutes);
app.use(productRoutes);
app.use(registerRoutes);
app.use(saleRoutes);
app.use(orderRoutes);

app.use(ErrorHandler.handle);
// app.use(imagesRoutes);

module.exports = app;
