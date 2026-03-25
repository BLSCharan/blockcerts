const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    signup,
    login,
    getCurrentUser,
    updateProfile,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/me", protect, getCurrentUser);
router.put("/update-profile", protect, updateProfile);

module.exports = router;
