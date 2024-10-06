const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a product description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a product price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please add a product category"],
      enum: ["Men's Clothing", "Women's Clothing", "Electronics"],
      default: "Men's Clothing",
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    // Add other fields as necessary (e.g., brand, tags, variants, etc.)
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for 'image' to provide the first image URL
productSchema.virtual("image").get(function () {
  return this.images && this.images.length > 0 ? this.images[0].url : "";
});

module.exports = mongoose.model("Product", productSchema);
