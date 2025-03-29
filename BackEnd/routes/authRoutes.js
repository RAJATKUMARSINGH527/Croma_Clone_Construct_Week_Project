const express = require("express");
const rateLimit = require("express-rate-limit")

const {
    checkEmail,
    submitPhoneNumber,
    sendOTP,
    verifyOTP,
    getAllUsers,
    getUserById,
} = require("../controllers/authController");
const verifyToken = require("../middleware/validation");

const authRouter = express.Router();


const otpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // Allow 3 attempts per minute
  message: { error: "Too many OTP verification attempts. Try again later." },
});


// Public Routes (No authentication required)
authRouter.post("/check-email", checkEmail); // Step 1: Verify email existence
authRouter.post("/submit-phone", submitPhoneNumber); // Step 2: Submit phone number
authRouter.post("/send-otp", sendOTP); // Step 3: Send OTP
authRouter.post("/verify-otp",otpLimiter, verifyOTP); // Step 4: Verify OTP

// Protected Routes (Requires authentication)

authRouter.get("/users", verifyToken, getAllUsers);
authRouter.get("/users/:id", verifyToken, getUserById);

module.exports = authRouter;
