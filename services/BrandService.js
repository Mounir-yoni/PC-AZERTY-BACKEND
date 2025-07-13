const Brand = require("../models/Brand");
const Factory = require("./HandleFactory");

// @desc get all brands
// @route GET /api/v1/brands
// @access public
const getBrands = Factory.getAll(Brand);

// @desc create new brand
// @route POST /api/v1/brands
// @access private
const newBrand = Factory.createOne(Brand);

// @desc get specific brand
// @route get /api/v1/brands/:id
// @access public

const getBrand = Factory.getOne(Brand);

// @desc delete brand
// @route put /api/v1/brands/:id
// @access private

const deleteBrand = Factory.deleteOne(Brand);

// @desc update brand
// @route put /api/v1/brands/:id
// @access private

const updateBrand = Factory.updateOne(Brand);

module.exports = {
  getBrands,
  newBrand,
  getBrand,
  deleteBrand,
  updateBrand,
};
