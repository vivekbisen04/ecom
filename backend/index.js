const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// connecting to db
require("./connections/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


const authRoutes = require("./routes/authRouters");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/poductRouters");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes =require("./routes/orderRoutes");

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ecom-2mt1.onrender.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowedOrigins array
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        // If the origin is not allowed, send an error
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If you need credentials like cookies to be included in the requests
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/",(req,res)=>{
  res.status(200).json("nnsnsc")
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
