// backend/controllers/productController.js

const asyncHandler = require("express-async-handler");
const Product = require("../models/products");
const cloudinary = require("../utils/cloudinary");

// @desc    Fetch all products with filters, pagination, and search
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    priceMin,
    priceMax,
    search,
  } = req.query;

  // Build query object
  const queryObject = {};

  if (category) {
    queryObject.category = category; // Exact match for better performance
  }

  if (priceMin || priceMax) {
    queryObject.price = {};
    if (priceMin) queryObject.price.$gte = Number(priceMin);
    if (priceMax) queryObject.price.$lte = Number(priceMax);
  }

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  const products = await Product.find(queryObject)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const count = await Product.countDocuments(queryObject);

  res.json({
    products,
    page: Number(page),
    pages: Math.ceil(count / Number(limit)),
    total: count,
  });
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });

  res.json(products);
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  // Handle image upload
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      images.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }
  } else {
    res.status(400);
    throw new Error("Please upload at least one image");
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    images,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update an existing product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;

    // Handle images update
    if (req.files && req.files.length > 0) {
      // Delete existing images from Cloudinary
      for (const image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Upload new images
      let newImages = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        newImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
      product.images = newImages;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Remove images from Cloudinary
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Use deleteOne() instead of remove()
    await product.deleteOne();

    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
