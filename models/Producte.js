/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      unique: [true, "Product title already exists"],
      minlenth: [3, "Product title must be at least 3 characters"],
      maxlength: [100, "Product title must be less than 100 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      minlenth: [20, "Product description must be at least 20 characters"],
      maxlength: [5000, "Product description must be less than 5000 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
      
    },
    Discount:{
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Please add a category"],
    },
    subcategories: {
      type: [mongoose.Schema.ObjectId],
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },

    imagecover: {
      type: String,
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    Partname: {
      type: String,
      enum: ["Package", "CPU", "gpu", "motherboard", "ram", "storage", "psu", "cooling", "case"],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name ",
  });
  next();
});

module.exports = mongoose.model("Product", productSchema);
