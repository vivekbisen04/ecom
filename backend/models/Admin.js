// backend/models/Admin.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: [true, "Please add an admin name"],
      trim: true,
    },
    adminEmail: {
      type: String,
      required: [true, "Please add an admin email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    adminPassword: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Add other admin-specific fields if necessary
  },
  {
    timestamps: true,
  }
);


adminSchema.pre("save", async function (next) {
  if (!this.isModified("adminPassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.adminPassword = await bcrypt.hash(this.adminPassword, salt);
  next();
});

// Method to match entered password to hashed password in database
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.adminPassword);
};

module.exports = mongoose.model("Admin", adminSchema);
