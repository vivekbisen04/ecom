// backend/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/usercontrollers");

// @route   GET /api/users/profile/:id
router.get("/profile/:id", getUserProfile);

// @route   PUT /api/users/profile/:id
router.put("/profile/:id", updateUserProfile);

// @route   GET /api/users
router.get("/", getAllUsers);

// @route   GET /api/users/:id
router.get("/:id", getUserById);

// @route   PUT /api/users/:id
router.put("/:id", updateUser);

// @route   DELETE /api/users/:id
router.delete("/:id", deleteUser);

module.exports = router;
