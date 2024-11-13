const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    role: { type: String, required: true, enum: ["student", "instructor", "site-admin"] }, // Role identifier
    profilePic: { type: String, default: "defaultProfilePic.jpg" }, // Optional profile picture
    gender: { type: String, required: true, default: "male" },
    // Notifications (shared across user types)
    notifications: [
        {
            message: { type: String },
            date: { type: Date, default: Date.now },
            isRead: { type: Boolean, default: false }
        }
    ],

    // Metadata (timestamps)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Base model (to be extended by specific user models)
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
