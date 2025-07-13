/* eslint-disable import/order */
const user = require("../models/User");
const Factory = require("./HandleFactory");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apierror");
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const createToken =require("../utils/createToken");

// @desc get all users
// @route GET /api/v1/users
// @access public
const getusers = Factory.getAll(user);

// @desc create new user
// @route POST /api/v1/users
// @access private
const newuser = Factory.createOne(user);

// @desc get specific user
// @route get /api/v1/users/:id
// @access public

const getuser = Factory.getOne(user);

// @desc delete user
// @route put /api/v1/users/:id
// @access private

const deleteuser = Factory.deleteOne(user);

// @desc update user
// @route put /api/v1/users/:id
// @access private

const updateuser = asyncHandler(async (req, res, next) => {
  const document = await user.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      active: req.body.active,
      profileImage: req.body.profileImage,
      passwordchangeAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError("document not found", 404));
  }
  res.status(200).json({ data: document });
});

const updatePassword = asyncHandler(async (req, res, next) => {
  console.log("old");
  const document = await user.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordchangeAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError("document not found", 404));
  }
  res.status(200).json({ data: document });
});
// @desc get logged in user data
// @route get /api/v1/users/me
// @access private
const getuserloggeddata = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc update logged  user password
// @route put /api/v1/users/updatepassword
// @access private/protected

const updateuserPassword = asyncHandler(async (req, res, next) => {
  console.log("ddddssss")
  console.log(req.user);
    const User = await user.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordchangeAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!User) {
    return next(new ApiError("User not found", 404));
  }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
  res.status(200).json({
    status: "success",
    token,
  });

});

// @desc update logged  user data
// @route put /api/v1/users/updateme
// @access private/protected

const updateuserme = asyncHandler(async (req, res, next) => {
  req.body.id = req.user._id;
  const User = await user.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  )
  if (!User) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    user:User
  });
});


// @desc disactivate logged  user 
// @route put /api/v1/users/disactivate
// @access private/protected

const disactivateuser = asyncHandler(async (req, res, next) => {
  req.body.id = req.user._id;
  const User = await user.findByIdAndUpdate(
    req.user._id,
    {
      active: false,
    },
    {
      new: true,
    }
  )
  if (!User) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    user:User
  });
});

module.exports = {
  getusers,
  newuser,
  getuser,
  deleteuser,
  updateuser,
  updatePassword,
  getuserloggeddata,
  updateuserPassword,
  updateuserme,
  disactivateuser
};
