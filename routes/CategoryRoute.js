const express = require("express");

const router = express.Router();
const {
  getCategoriesvalidator,
  newCategoryvalidator,
  updateCategoryvalidator,
  deleteCategoryvalidator,
} = require("../utils/validators/CategoryValidator");
const Authunticate = require("../services/AuthService");
const {
  getCategories,
  newCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/CategoryService");

const ProductRoute = require("./ProductRoute ");
// Ensure functions are correctly imported and exist
if (!getCategories) {
  console.error(
    "Error: getCategories or newCategory is not imported correctly."
  );
}

router.use("/:CategoryId/Products", ProductRoute);
// Define routes
router
  .route("/")
  .get(getCategories)
  .post(Authunticate.protect,Authunticate.allowedTo("admin","manager","superadmin"), newCategoryvalidator, newCategory);
router
  .route("/:id")
  .get(getCategoriesvalidator, getCategory)
  .put(updateCategoryvalidator, updateCategory)
  .delete(deleteCategoryvalidator, deleteCategory);

module.exports = router;
