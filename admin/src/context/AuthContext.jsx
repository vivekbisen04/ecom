// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  // Login function remains unchanged as it already aligns with the backend
  const login = async (email, password) => {
    try {
      const response = await axios.post("/admin/login", {
        adminEmail: email,
        adminPassword: password,
      });
      setAdmin(response.data);
      localStorage.setItem("admin", JSON.stringify(response.data));
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Updated register function to align with backend field names
  const register = async (name, email, password) => {
    try {
      const response = await axios.post("/admin/register", {
        adminName: name, // Changed from 'name' to 'adminName'
        adminEmail: email, // Changed from 'email' to 'adminEmail'
        adminPassword: password, // Changed from 'password' to 'adminPassword'
      });
      console.log("Registration Response:", response.data); // Debugging
      setAdmin(response.data);
      localStorage.setItem("admin", JSON.stringify(response.data));
      toast.success("Registered successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration Error:", error); // Enhanced logging
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    toast.info("Logged out");
    navigate("/login");
  };

  useEffect(() => {
    // Optionally, verify token validity here
  }, []);

  return (
    <AuthContext.Provider value={{ admin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
