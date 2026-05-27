import express from "express";
import { registerUser, loginUser,refreshAccessToken, logout, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.Middleware.js";
import { studentOnly } from "../middleware/profile.Middleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

// Profile - any authenticated user
router.get("/profile", protect, getProfile);

export default router;