/* eslint-disable no-unused-vars */
const express = require("express");

const router = express.Router();
const { signupValidator } = require("../utils/validators/AuthValidator");

const {
  signup,
  login,
  forgotPassword,
  verifyPasswordresetcode,
  resetPassword,
} = require("../services/AuthService");

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyPasswordresetcode", verifyPasswordresetcode);
router.put("/setPassword", resetPassword);
module.exports = router;
