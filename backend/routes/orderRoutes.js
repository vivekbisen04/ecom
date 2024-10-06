// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Place a new order
router.post("/", orderController.placeOrder);

// Get all orders for a user
router.get("/user/:userId", orderController.getUserOrders);

// Get a single order by ID
router.get("/:orderId", orderController.getOrderById);

// (Optional) Update order status
router.put("/:orderId/status", orderController.updateOrderStatus);

module.exports = router;
