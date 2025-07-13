/* eslint-disable no-unused-vars */
const express = require("express");

const router = express.Router();
const {
  newUserValidator,
  getUservalidator,
  updateUservalidator,
  deleteUservalidator,
  resetPasswordValidator,
} = require("../utils/validators/UserValidator");

const { protect } = require("../services/AuthService");

const {
  getusers,
  newuser,
  getuser,
  updateuser,
  deleteuser,
  updatePassword,
  getuserloggeddata,
  updateuserPassword,
  updateuserme,
  disactivateuser
} = require("../services/UserService");

router.route("/").get(getusers).post(newUserValidator, newuser);
router.route("/getme").get(protect, getuserloggeddata, getuser);
router.route("/changemypassword").put(protect,updateuserPassword );
router.route("/updateme").put(protect, updateuserme);
router.route("/deactivate").put(protect, disactivateuser);
router
  .route("/:id")
  .get(getUservalidator, getuser)
  .put(updateUservalidator, updateuser)
  .delete(deleteUservalidator, deleteuser);
router.route("/updatePassword/:id").put(resetPasswordValidator, updatePassword);
module.exports = router;
