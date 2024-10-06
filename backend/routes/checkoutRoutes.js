// routes/checkoutRoutes.js
const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

// Checkout
router.post("/", checkoutController.checkout);

module.exports = router;
