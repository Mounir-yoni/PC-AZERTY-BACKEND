const { body } = require('express-validator');

exports.createCommentValidator = [
  body('product')
    .notEmpty()
    .withMessage('Product ID is required'),
  body('user')
    .notEmpty()
    .withMessage('User ID is required'),
  body('comment')
    .notEmpty()
    .withMessage('Comment text is required'),
]; 