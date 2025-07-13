const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middelwars/ValidatorMiddelwares");
const User = require("../../models/User");
// eslint-disable-next-line import/order, import/no-extraneous-dependencies
const bcrypt = require("bcryptjs");

const newUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("Please add a name")
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters")
    .isLength({ max: 30 })
    .withMessage("User name must be less than 30 characters"),
  validatorMiddleware,
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  check("email")
    .notEmpty()
    .withMessage("Please add a email")
    .isEmail()
    .withMessage("User email is invalid")
    .isLength({ max: 100 })
    .withMessage("User email must be less than 100 characters")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Please add a password")
    .isLength({ min: 6 })
    .withMessage("User password must be at least 6 characters")
    .isLength({ max: 30 })
    .withMessage("User password must be less than 30 characters"),
  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("User role is invalid"),
  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("User phone is invalid"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation is invalid");
      }
      return true;
    }),
  validatorMiddleware,
];

const getUservalidator = [
  check("id").isMongoId().withMessage("Invalid User id 1"),
  validatorMiddleware,
];
const updateUservalidator = [
  check("id").isMongoId().withMessage("Invalid User id 2"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  check("email")
  .notEmpty()
  .withMessage("Please add a email")
  .isEmail()
  .withMessage("User email is invalid")
  .isLength({ max: 100 })
  .withMessage("User email must be less than 100 characters")
  .custom((val) =>
    User.findOne({ email: val }).then((user) => {
      if (user) {
        return Promise.reject(new Error("E-mail already in use"));
      }
    })
  ),
  check("phone")
  .optional()
  .isMobilePhone("any")
  .withMessage("User phone is invalid"),
  validatorMiddleware,
];

const deleteUservalidator = [
  check("id").isMongoId().withMessage("Invalid User id"),
  validatorMiddleware,
];

const resetPasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Please add a current password"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation is invalid");
      }
      return true;
    }),
    body("password")
    .notEmpty()
    .withMessage("Please add a new password")
    .custom(async (value, { req }) => {
      const user = await User.findById(req.params.id);
      console.log(req.body.currentPassword);
      console.log(user.password);
      const isPasswordCorrect = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      )
      console.log(isPasswordCorrect);
      if (!isPasswordCorrect) {
        throw new Error("Current password is invalid");
      }
      return true;
    }),
  validatorMiddleware,
];

module.exports = {
  newUserValidator,
  getUservalidator,
  updateUservalidator,
  deleteUservalidator,
  resetPasswordValidator,
};
