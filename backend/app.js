const express = require('express');
const productRoutes = require('./routes/productRoutes');
const errorMiddleware = require('./middlewares/errors');

const app = express();
app.use(express.json());

app.use('/api/v1', productRoutes);

// Error handler middleware
app.use(errorMiddleware);

module.exports = app;
