const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middelwars/ValidatorMiddelwares");

const newBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Please add a name")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters")
    .isLength({ max: 30 })
    .withMessage("Brand name must be less than 30 characters"),
  validatorMiddleware,
  body("name").custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    })
];

const getBrandvalidator = [
  check("id").isMongoId().withMessage("Invalid Brand id"),
  validatorMiddleware,
];
const updateBrandvalidator = [
  check("id").isMongoId().withMessage("Invalid Brand id"),
  validatorMiddleware,
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  })
];

const deleteBrandvalidator = [
  check("id").isMongoId().withMessage("Invalid Brand id"),
  validatorMiddleware,
];

module.exports = {
  newBrandValidator,
  getBrandvalidator,
  updateBrandvalidator,
  deleteBrandvalidator,
};