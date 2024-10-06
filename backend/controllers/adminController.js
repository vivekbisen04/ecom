// backend/controllers/adminController.js

const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public (Consider restricting this route)
const registerAdmin = asyncHandler(async (req, res) => {
  const { adminName, adminEmail, adminPassword } = req.body;

  // Check if admin already exists
  const adminExists = await Admin.findOne({ adminEmail });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin with this email already exists");
  }

  // Create new admin
  const admin = await Admin.create({
    adminName,
    adminEmail,
    adminPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      adminName: admin.adminName,
      adminEmail: admin.adminEmail,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc    Authenticate admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  const admin = await Admin.findOne({ adminEmail }).select("+adminPassword");

  if (admin && (await admin.matchPassword(adminPassword))) {
    res.json({
      _id: admin._id,
      adminName: admin.adminName,
      adminEmail: admin.adminEmail,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
const getAdminProfile = asyncHandler(async (req, res) => {
  if (!req.admin) {
    res.status(401);
    throw new Error("Not authorized, admin data missing");
  }

  const admin = await Admin.findById(req.admin.id);

  if (admin) {
    res.json({
      _id: admin._id,
      adminName: admin.adminName,
      adminEmail: admin.adminEmail,
      createdAt: admin.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private/Admin
const updateAdminProfile = asyncHandler(async (req, res) => {
  if (!req.admin) {
    res.status(401);
    throw new Error("Not authorized, admin data missing");
  }

  const admin = await Admin.findById(req.admin.id).select("+adminPassword");

  if (admin) {
    admin.adminName = req.body.adminName || admin.adminName;
    admin.adminEmail = req.body.adminEmail || admin.adminEmail;
    if (req.body.adminPassword) {
      admin.adminPassword = req.body.adminPassword;
    }

    const updatedAdmin = await admin.save();

    res.json({
      _id: updatedAdmin._id,
      adminName: updatedAdmin.adminName,
      adminEmail: updatedAdmin.adminEmail,
      token: generateToken(updatedAdmin._id),
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
};
