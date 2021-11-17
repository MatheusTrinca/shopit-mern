const Product = require('../models/productModel');

exports.getProduct = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'Get Products Route',
  });
};

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  return res.status(201).json({
    success: true,
    product,
  });
};
