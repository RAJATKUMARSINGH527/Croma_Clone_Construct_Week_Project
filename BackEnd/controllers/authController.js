const { UserModel } = require("../models/userModel");
const twilio = require("twilio");
require("dotenv").config();

// Configure Twilio
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioServiceId = process.env.TWILIO_SERVICE_ID;

// Email validation function
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Phone validation function
const isValidPhone = (phone) => /^\d{10}$/.test(phone);

/**
 * ✅ Step 1: Check Email (No Registration Check)
 */
exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("📩 Checking email:", email);

        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        res.status(200).json({ message: "Email submitted. Proceed to phone verification." });
    } catch (error) {
        console.error("❌ Error submitting email:", error);
        res.status(500).json({ message: "Error submitting email", error: error.message });
    }
};

/**
 * ✅ Step 2: Submit Phone Number
 */
exports.submitPhoneNumber = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        console.log("📞 Submitting phone number:", phoneNumber);

        if (!phoneNumber || !isValidPhone(phoneNumber)) {
            return res.status(400).json({ message: "Invalid phone number format." });
        }

        res.status(200).json({ message: "Phone number submitted. Proceed to OTP verification." });
    } catch (error) {
        console.error("❌ Error submitting phone number:", error);
        res.status(500).json({ message: "Error submitting phone number", error: error.message });
    }
};

/**
 * ✅ Step 3: Send OTP via Twilio Verify
 */
exports.sendOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        console.log("📲 Sending OTP to:", phoneNumber);

        if (!phoneNumber || !isValidPhone(phoneNumber)) {
            return res.status(400).json({ message: "Invalid phone number format." });
        }

        const response = await twilioClient.verify.v2.services(twilioServiceId)
            .verifications.create({ to: `+91${phoneNumber}`, channel: "sms" });

        console.log("✅ OTP Sent Response:", response);
        res.status(200).json({ message: "OTP sent successfully." });
    } catch (error) {
        console.error("❌ Error sending OTP:", error);
        res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
};

/**
 * ✅ Step 4: Verify OTP & Register/Update User
 */
exports.verifyOTP = async (req, res) => {
    try {
        const { phoneNumber, otp, email } = req.body;
        console.log("🔍 Verifying OTP for:", { phoneNumber, otp, email });

        // Validate input
        if (!phoneNumber || !isValidPhone(phoneNumber) || !otp || !email || !isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid phone number, OTP, or email." });
        }

        // Verify OTP using Twilio
        const verification_check = await twilioClient.verify.v2.services(twilioServiceId)
            .verificationChecks.create({ to: `+91${phoneNumber}`, code: otp });

        console.log("✅ Twilio Verification Response:", verification_check);

        if (verification_check.status !== "approved") {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }

        // Find user by phone number
        let user = await UserModel.findOne({ phoneNumber });

        if (!user) {
            // Create new user if not exists
            user = new UserModel({ email, phoneNumber, isVerified: true });
        } else {
            // Update existing user
            user.isVerified = true;

            // Update email only if provided and different
            if (user.email !== email) {
                user.email = email;
            }
        }

        await user.save();

        res.status(200).json({ message: "OTP verified successfully. User updated!", user });
    } catch (error) {
        console.error("❌ Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
};

/**
 * ✅ Get All Users (Admin Route)
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, "-password");
        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

/**
 * ✅ Get User by ID
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id, "-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};
