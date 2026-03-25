const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET || "your_jwt_secret_key",
        { expiresIn: "7d" }
    );
};

// =======================
// SIGNUP
// =======================
exports.signup = async (req, res) => {
    try {
        const {
            organizationName,
            organizationRegistrationId,
            email,
            password,
            confirmPassword,
            organizationType,
            about,
            address,
            website,
            phone
        } = req.body;

        // Validate required fields
        if (
            !organizationName ||
            !organizationRegistrationId ||
            !email ||
            !password ||
            !organizationType
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Validate password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Check if email exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Check if registration ID exists
        user = await User.findOne({ organizationRegistrationId });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "Organization Registration ID already exists"
            });
        }

        // Create user
        user = await User.create({
            organizationName,
            organizationRegistrationId,
            email,
            password,
            organizationType,
            about,
            address,
            website,
            phone
        });

        console.log(`[SIGNUP] New user created: ${email}, Password hashed: ${user.password ? "YES" : "NO"}`);

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "Organization registered successfully",
            token,
            user: {
                id: user._id,
                organizationName: user.organizationName,
                email: user.email,
                organizationType: user.organizationType,
                role: user.role
            }
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error during signup"
        });
    }
};

// =======================
// LOGIN (FIXED)
// =======================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Find user and select password field
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            console.log(`[LOGIN] User not found with email: ${email}`);
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        console.log(`[LOGIN] User found: ${email}, Password hashed in DB: ${user.password ? "YES" : "NO"}`);

        // Compare password using bcrypt
        const isPasswordCorrect = await user.comparePassword(password);
        
        console.log(`[LOGIN] Password comparison result: ${isPasswordCorrect}`);
        
        if (!isPasswordCorrect) {
            console.log(`[LOGIN] Password mismatch for user: ${email}`);
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate token
        const token = generateToken(user._id);

        console.log(`[LOGIN] Login successful for user: ${email}`);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                organizationName: user.organizationName,
                email: user.email,
                organizationType: user.organizationType,
                role: user.role
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error during login"
        });
    }
};

// =======================
// GET CURRENT USER
// =======================
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error("GET USER ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error fetching user"
        });
    }
};

// =======================
// UPDATE PROFILE
// =======================
exports.updateProfile = async (req, res) => {
    try {
        const { organizationName, about, address, website, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                organizationName,
                about,
                address,
                website,
                phone,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error updating profile"
        });
    }
};

// =======================
// FORGOT PASSWORD (SIMPLE - NO EMAIL)
// =======================
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate input
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide an email address"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User with this email not found"
            });
        }

        console.log(`[FORGOT PASSWORD] Email verified: ${email}, User found`);

        // Return user info so frontend can show password reset form
        res.status(200).json({
            success: true,
            message: "Email verified. You can now reset your password.",
            user: {
                id: user._id,
                email: user.email,
                organizationName: user.organizationName
            }
        });

    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error processing forgot password request"
        });
    }
};

// =======================
// RESET PASSWORD (DIRECT)
// =======================
exports.resetPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Validate input
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide email, password, and confirm password"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update password
        user.password = password;
        await user.save();

        console.log(`[RESET PASSWORD] Password updated successfully for user: ${email}`);

        res.status(200).json({
            success: true,
            message: "Password reset successfully. You can now login with your new password."
        });

    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error resetting password"
        });
    }
};