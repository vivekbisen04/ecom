// src/components/ProductForm.js
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";

const ProductForm = ({ onAdd, existingProduct, onUpdate }) => {
  const [name, setName] = useState(existingProduct ? existingProduct.name : "");
  const [description, setDescription] = useState(
    existingProduct ? existingProduct.description : ""
  );
  const [price, setPrice] = useState(
    existingProduct ? existingProduct.price : 0
  );
  const [category, setCategory] = useState(
    existingProduct ? existingProduct.category : "Men's Clothing"
  );
  const [stock, setStock] = useState(
    existingProduct ? existingProduct.stock : 0
  );
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState(
    existingProduct ? existingProduct.images.map((img) => img.url) : []
  );

  // Define the available categories
  const categories = ["Men's Clothing", "Women's Clothing", "Electronics"];

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !stock) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      if (existingProduct) {
        // Update product
        const response = await axios.put(
          `/products/${existingProduct._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Product updated successfully");
        onUpdate(response.data);
      } else {
        // Create product
        const response = await axios.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added successfully");
        onAdd(response.data);
        // Reset form
        setName("");
        setDescription("");
        setPrice(0);
        setCategory("Men's Clothing");
        setStock(0);
        setImages([]);
        setPreviewImages([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previewImages.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [previewImages]);

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-2xl mb-4">
        {existingProduct ? "Update Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Product Name"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Product Description"
          />
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1">
            Price
          </label>
          <input
            id="price"
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        {/* Category Field - Dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <select
            id="category"
            className="w-full border px-3 py-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Field */}
        <div className="mb-4">
          <label htmlFor="stock" className="block mb-1">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            min="0"
            placeholder="0"
          />
        </div>

        {/* Images Field */}
        <div className="mb-4">
          <label htmlFor="images" className="block mb-1">
            Images
          </label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required={!existingProduct}
          />
          <div className="flex space-x-2 mt-2">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`${
            existingProduct ? "bg-blue-600" : "bg-green-600"
          } text-white px-4 py-2 rounded`}
        >
          {existingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
