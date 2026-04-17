const express = require("express");
const router = express.Router();
const { login, register, changePassword, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/login", login);
router.post("/register", register);

// Protected routes
router.post("/change-password", protect, changePassword);
router.get("/me", protect, getMe);

module.exports = router;