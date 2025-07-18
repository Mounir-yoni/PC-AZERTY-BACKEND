const Product = require("../models/Producte");
const Factory = require("./HandleFactory");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apierror");
const APIFeatures = require("../utils/apiFeaturs");

const setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.CategoryId;
  next();
};

// @desc get all products
// @route GET /api/v1/products
// @access public
const getProducts = Factory.getAll(Product, "Product");

// @desc create new product
// @route POST /api/v1/products
// @access private

const newProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  console.log(req.file); // ✅ هذا سيكون ملف الصورة الواحد

  // إذا تم رفع صورة واحدة، خزّن اسمها كـ imagecover أو image
  if (req.file) {
    req.body.imagecover = req.file.filename; // أو req.file.path حسب ما تريد
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    req.body.imagecover = `https://res.cloudinary.com/${cloudName}/image/upload/${req.body.imagecover}`;
  }

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});


// @desc get specific product
// @route get /api/v1/products/:id
// @access public
const getProduct = Factory.getOne(Product);

// @desc update product
// @route put /api/v1/products/:id
// @access private
const updateProduct = Factory.updateOne(Product);
// @desc delete product
// @route delete /api/v1/products/:id
// @access private
const deleteProduct = Factory.deleteOne(Product);


const getPartsproducts = asyncHandler(async (req, res, next) => {
  const { partname } = req.query;

  console.log(partname);
  // Build query for parts products
  let filter = {};
  if (partname) {
    filter.Partname = { $regex: new RegExp(`^${partname}$`, 'i') };
  }
  // Use APIFeatures for filtering, sorting, searching, pagination, etc.
  const features = new APIFeatures(Product.find(filter), req.query)


  const products = await features.Mongoosequery;
  console.log(products)
  res.status(200).json({ result: products.length, data: products });
});

module.exports = {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  setCategoryIdToBody,
  getPartsproducts
};
