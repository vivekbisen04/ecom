// backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Removed protect and admin middlewares
// const { protect, admin } = require("../middlewares/authMiddleware");

// Configure Multer Storage (using disk storage for Cloudinary)
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Public Routes
router
  .route("/")
  .get(getProducts)
  .post(upload.array("images", 5), createProduct);
router.route("/category/:category").get(getProductsByCategory);
router
  .route("/:id")
  .get(getProductById)
  .put(upload.array("images", 5), updateProduct)
  .delete(deleteProduct);

module.exports = router;
