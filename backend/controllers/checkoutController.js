// controllers/checkoutController.js
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/products");

exports.checkout = async (req, res) => {
  const { userId, shippingAddress, payment } = req.body;

  try {
    // Fetch user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate totals
    let subtotal = 0;
    let totalItems = 0;
    cart.items.forEach((item) => {
      subtotal += item.product.price * item.qty;
      totalItems += item.qty;
    });

    const shipping = 30.0;
    const total = subtotal + shipping;

    // Create Order
    const order = new Order({
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

    await order.save();

    // Clear Cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
