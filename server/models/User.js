const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: [true, "Organization name is required"],
        trim: true,
        minlength: [2, "Organization name must be at least 2 characters"]
    },

    organizationRegistrationId: {
        type: String,
        required: [true, "Organization registration ID is required"],
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false // Don't return password in queries by default
    },

    organizationType: {
        type: String,
        enum: ["College", "University", "Company", "School", "Institute", "Other"],
        required: [true, "Organization type is required"]
    },

    about: {
        type: String,
        maxlength: [1000, "About text cannot exceed 1000 characters"]
    },

    address: {
        type: String,
        trim: true
    },

    website: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                // Only validate if website is provided
                if (!v) return true;
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
            },
            message: "Please provide a valid website URL"
        }
    },

    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                // Only validate if phone is provided
                if (!v) return true;
                return /^(\+\d{1,3}[- ]?)?\d{10,}$/.test(v);
            },
            message: "Please provide a valid phone number"
        }
    },

    role: {
        type: String,
        enum: ["organization", "admin"],
        default: "organization"
    },

    isActive: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre("save", async function () {
    // Only hash if password is modified
    if (!this.isModified("password")) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get user data without password
userSchema.methods.toJSON = function () {
    const { password, ...userWithoutPassword } = this.toObject();
    return userWithoutPassword;
};

module.exports = mongoose.model("User", userSchema);
