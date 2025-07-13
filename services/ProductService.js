const Product = require("../models/Producte");
const Factory = require("./HandleFactory");

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

const newProduct = Factory.createOne(Product);

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

module.exports = {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  setCategoryIdToBody,
};
