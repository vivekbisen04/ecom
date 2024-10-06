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

app.use(cors());
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
