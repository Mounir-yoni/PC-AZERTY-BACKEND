/* eslint-disable no-unused-vars */
const express = require("express");
const product = require("../models/Producte");
const router = express.Router({ mergeParams: true });
const {
  newProductValidator,
  getProductvalidator,
  updateProductvalidator,
  deleteProductvalidator,
} = require("../utils/validators/ProducteValidator ");
const {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  setCategoryIdToBody,
  

} = require("../services/ProductService");

router.route("/").get(setCategoryIdToBody,getProducts).post(setCategoryIdToBody,newProductValidator, newProduct);
router.get('/homepage-products', async (req, res) => {
    const latest = await product.find().sort({ createdAt: -1 }).limit(4);
    const bestSelling = await product.find().sort({ sold: -1 }).limit(4);
    const discounted = await product.find().sort({priceAfterDiscount:1}).limit(4);
    
    res.json({ latest, bestSelling, discounted });
  });
router
  .route("/:id")
  .get(getProductvalidator, getProduct)
  .put(updateProductvalidator, updateProduct)
  .delete(deleteProductvalidator, deleteProduct);

module.exports = router;
