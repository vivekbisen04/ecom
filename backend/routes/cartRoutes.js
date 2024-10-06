// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartConroller");

// Add to cart
router.post("/add", cartController.addToCart);

// Remove from cart
router.post("/remove", cartController.removeFromCart);

// Get cart items
router.get("/:userId", cartController.getCart);

module.exports = router;
