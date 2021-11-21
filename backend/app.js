const express = require('express');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errors');

const app = express();
app.use(express.json());

app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);

// Error handler middleware
app.use(errorMiddleware);

module.exports = app;
