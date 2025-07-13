const Category = require("../models/Category");
const Factory = require("./HandleFactory");
// @desc get all categories
// @route GET /api/v1/categories
// @access public
const getCategories = Factory.getAll(Category);

// @desc create new category
// @route POST /api/v1/categories
// @access private
const newCategory = Factory.createOne(Category);

// @desc get specific category
// @route get /api/v1/categories/:id
// @access public
const getCategory = Factory.getOne(Category);

// @desc update category
// @route put /api/v1/categories/:id
// @access private
const updateCategory = Factory.updateOne(Category);

// @desc delete category
// @route delete /api/v1/categories/:id
// @access private

const deleteCategory = Factory.deleteOne(Category);

module.exports = {
  getCategories,
  newCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
