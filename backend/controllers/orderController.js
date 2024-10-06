// controllers/orderController.js
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/products");

// Place a new order (Checkout)
exports.placeOrder = async (req, res) => {
  const { userId, shippingAddress, payment } = req.body;

  try {
    // Fetch user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // Calculate totals
    let subtotal = 0;
    let totalItems = 0;
    cart.items.forEach((item) => {
      subtotal += item.product.price * item.qty;
      totalItems += item.qty;
    });

    const shipping = 30.0; // Fixed shipping cost; you can make this dynamic
    const total = subtotal + shipping;

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        qty: item.qty,
        price: item.product.price,
      })),
      shippingAddress,
      payment,
      subtotal,
      shipping,
      total,
    });

    // Save order to database
    const savedOrder = await newOrder.save();

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders for a specific user
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("items.product")
      .populate("user", "-password");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// (Optional) Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // e.g., "Shipped", "Delivered", etc.

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
