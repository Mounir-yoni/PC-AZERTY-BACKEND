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
  getPartsproducts,
  

} = require("../services/ProductService");

const {protect, allowedTo} = require("../services/AuthService");
const upload = require("../utils/multer");

router.route("/")
  .get(setCategoryIdToBody, getProducts)
  .post(
    setCategoryIdToBody,
    upload.single("imagecover"),
    newProductValidator,
    protect,
    allowedTo("admin", "superadmin", "manager"),
    newProduct
  );
router.get('/homepage-products', async (req, res) => {
    const latest = await product.find({active:true}).sort({ createdAt: -1 }).limit(4);
    const bestSelling = await product.find({active:true}).sort({ sold: -1 }).limit(4);
    const discounted = await product.find({active:true}).sort({priceAfterDiscount:1}).limit(4);
    
    res.json({ latest, bestSelling, discounted });
  });
  router.get('/parts-products', getPartsproducts);
router
  .route("/:id")
  .get(getProductvalidator, getProduct)
  .put(updateProductvalidator,protect,allowedTo("admin", "superadmin", "manager"), updateProduct)
  .delete(deleteProductvalidator,protect,allowedTo("admin", "superadmin", "manager"), deleteProduct);

module.exports = router;
