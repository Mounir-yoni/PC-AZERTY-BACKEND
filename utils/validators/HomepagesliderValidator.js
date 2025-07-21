const { check } = require("express-validator");
const validatorMiddleware = require("../../middelwars/ValidatorMiddelwares");

const newSliderValidator = [
  check("title")
    .notEmpty()
    .withMessage("Please add a title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),
  check("description")
    .notEmpty()
    .withMessage("Please add a description")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters")
    .isLength({ max: 5000 })
    .withMessage("Description must be less than 5000 characters"),
  check("image")
    .notEmpty()
    .withMessage("Please add an image"),
  validatorMiddleware,
];

const getSliderValidator = [
  check("id").isMongoId().withMessage("Invalid slider id"),
  validatorMiddleware,
];

const updateSliderValidator = [
  check("id").isMongoId().withMessage("Invalid slider id"),
  validatorMiddleware,
];

const deleteSliderValidator = [
  check("id").isMongoId().withMessage("Invalid slider id"),
  validatorMiddleware,
];

module.exports = {
  newSliderValidator,
  getSliderValidator,
  updateSliderValidator,
  deleteSliderValidator,
}; 