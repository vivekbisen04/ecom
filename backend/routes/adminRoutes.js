// backend/routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
} = require("../controllers/adminController");
const { protectAdmin } = require("../middlewares/authMiddleware"); // Import protectAdmin

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected routes
router
  .route("/profile")
  .get(protectAdmin, getAdminProfile)
  .put(protectAdmin, updateAdminProfile);

module.exports = router;
