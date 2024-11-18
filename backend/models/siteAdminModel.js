const mongoose = require("mongoose");
const { userModel } = require("./userModel");  // Import the base userModel

// Define the admin-specific schema fields
const adminSchema = new mongoose.Schema({
    // Platform Management
    adminId: { type: String, required: true },
    permissions: { type: [String], default: ["manageUsers", "manageCourses", "manageTests", "viewReports", "configureSettings"] },

    // Activity Logs & Audits
    activityLog: [
        {
            action: { type: String },
            date: { type: Date },
            targetId: { type: mongoose.Schema.Types.ObjectId },
            targetType: { type: String }
        }
    ],
    auditTrail: [
        {
            description: { type: String },
            performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
            timestamp: { type: Date },
            changes: { type: Object }
        }
    ],

    // Platform Configuration
    settings: {
        theme: { type: String, default: "light" },
        language: { type: String, default: "en" },
        maintenanceMode: { type: Boolean, default: false },
        notificationSettings: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true }
        }
    },

    // Notifications
    notifications: [
        {
            message: { type: String },
            date: { type: Date },
            isRead: { type: Boolean, default: false }
        }
    ],

    // Metadata
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Create the admin model by using discriminator on the userModel
const siteAdminModel = userModel.discriminator("Admin", adminSchema);

module.exports = siteAdminModel;
