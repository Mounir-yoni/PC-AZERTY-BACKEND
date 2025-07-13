/* eslint-disable no-unused-vars */
const express = require("express");

const router = express.Router();
const {
  newBrandValidator,

  getBrandvalidator,
  updateBrandvalidator,
  deleteBrandvalidator,
} = require("../utils/validators/BrandValidator");
const {
  getBrands,
  newBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  
} = require("../services/BrandService");

router.route("/").get(getBrands).post(newBrandValidator, newBrand);
router
  .route("/:id")
  .get(getBrandvalidator, getBrand)
  .put(updateBrandvalidator, updateBrand)
  .delete(deleteBrandvalidator, deleteBrand);
module.exports = router;
