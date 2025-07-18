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

const { protect,allowedTo } = require("../services/AuthService");

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

router.route("/").get(getusers).post(protect,allowedTo('admin','superadmin','manager'),newUserValidator, newuser);
router.route("/getme").get(protect, getuserloggeddata, getuser);
router.route("/changemypassword").put(protect,updateuserPassword );
router.route("/updateme").put(protect, updateuserme);
router.route("/deactivate").put(protect, disactivateuser);
router
  .route("/:id")
  .get(getUservalidator,protect,allowedTo('admin','superadmin','manager'),getuser)
  .put(updateUservalidator,protect,allowedTo('admin','superadmin','manager'), updateuser)
  .delete(deleteUservalidator,protect,allowedTo('admin','superadmin','manager'), deleteuser);
router.route("/updatePassword/:id").put(resetPasswordValidator, updatePassword);
module.exports = router;
