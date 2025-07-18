/* eslint-disable prefer-promise-reject-errors */
const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middelwars/ValidatorMiddelwares");
const Category = require("../../models/Category");

const newProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Please add a title")
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters"),
  //.isLength({ max: 100 })
  //.withMessage("Product title must be less than 100 characters")
  check("description")
    .notEmpty()
    .withMessage("Please add a description")
    .isLength({ min: 20 })
    .withMessage("Product description must be at least 20 characters")
    .isLength({ max: 500 })
    .withMessage("Product description must be less than 500 characters"),
  check("quantity")
    .notEmpty()
    .withMessage("Please add a quantity")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Please add a price")
    .isNumeric()
    .withMessage("Product price must be a number"),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Product price must be a number")
    .custom((value, { req }) => {
      if (req.body.price < value) {
        throw new Error(
          "Product price after discount must be less than the product price"
        );
      }
      return true;
    }),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be an array"),
  check("category")
    .isMongoId()
    .withMessage("Invalid category id")
    .custom(async (value, { req }) => {
      const category = await Category.findById(value);
      if (!category) {
        return Promise.reject("Invalid category id");
      }
    }),
  
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Product ratingsAverage must be greater than 1")
    .isLength({ max: 5 })
    .withMessage("Product ratingsAverage must be less than 5"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product ratingsQuantity must be a number"),
  validatorMiddleware,
  body("title").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
];

const getProductvalidator = [
  check("id").isMongoId().withMessage("Invalid Product id"),
  validatorMiddleware,
];
const updateProductvalidator = [
  check("id").isMongoId().withMessage("Invalid Product id"),
  validatorMiddleware,
  body("title").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
];

const deleteProductvalidator = [
  check("id").isMongoId().withMessage("Invalid Product id"),
  validatorMiddleware,
];

module.exports = {
  newProductValidator,
  getProductvalidator,
  updateProductvalidator,
  deleteProductvalidator,
};
