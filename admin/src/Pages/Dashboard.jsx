// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductList from "../Components/ProductList";
import ProductForm from "../Components/ProductForm";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((prod) =>
        prod._id === updatedProduct._id ? updatedProduct : prod
      )
    );
  };

  const handleDeleteProduct = (deletedProductId) => {
    setProducts(products.filter((prod) => prod._id !== deletedProductId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <ProductForm onAdd={handleAddProduct} />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList
          products={products}
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default Dashboard;
