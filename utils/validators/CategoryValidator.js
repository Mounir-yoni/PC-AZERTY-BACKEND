const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddelware = require("../../middelwars/ValidatorMiddelwares");

const getCategoriesvalidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddelware,
];

const newCategoryvalidator = [
  check("name")
    .notEmpty()
    .withMessage("Please add a name")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters")
    .isLength({ max: 30 })
    .withMessage("Category name must be less than 30 characters"),
  validatorMiddelware,
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  })
];
const updateCategoryvalidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddelware,
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
];
const deleteCategoryvalidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddelware,
];

module.exports = {
  getCategoriesvalidator,
  newCategoryvalidator,
  updateCategoryvalidator,
  deleteCategoryvalidator,
};
