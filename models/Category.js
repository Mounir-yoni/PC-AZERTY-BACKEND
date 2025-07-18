const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: [true, "Category name already exists"],
      minlenth: [3, "Category name must be at least 3 characters"],
      maxlength: [30, "Category name must be less than 30 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
