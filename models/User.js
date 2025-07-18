/* eslint-disable import/no-extraneous-dependencies */
const moongose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      unique: [true, "User name already exists"],
      minlenth: [3, "User name must be at least 3 characters"],
      maxlength: [30, "User name must be less than 30 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      trim: true,
      unique: [true, "User email already exists"],
      minlenth: [3, "User email must be at least 3 characters"],
      maxlength: [30, "User email must be less than 30 characters"],
    },
    phone: String,
    profileImage: String,
    address: {
      type: String,
      required: [true, "Please add a address"],
      trim: true,
      minlenth: [3, "User address must be at least 3 characters"],
      maxlength: [100, "User address must be less than 100 characters"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      trim: true,
      minlenth: [3, "User password must be at least 3 characters"],
    },
    passwordchangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordResetverified: Boolean,
    role: {
      type: String,
      enum: ["user", "admin","superadmin","manager"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre(/^save/, async function (next) {
  if (!this.isModified("password")) return next();
  // haching password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = moongose.model("User", userSchema);
