const { body } = require('express-validator');

exports.createOrderValidator = [
  body('products')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one product'),
  body('products.*.product')
    .notEmpty()
    .withMessage('Product ID is required'),
  body('products.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('products.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('totalValue')
    .isFloat({ min: 0 })
    .withMessage('Total value must be a positive number'),
  body('address')
    .notEmpty()
    .withMessage('Address is required'),
  body('phone')
    .notEmpty()
    .withMessage('Phone is required'),
  
]; 