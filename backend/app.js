const express = require('express');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);

// Error handler middleware
app.use(errorMiddleware);

module.exports = app;
