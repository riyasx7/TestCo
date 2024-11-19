const mongoose = require("mongoose");
const userModel = require("./userModel");

// Define the schema for Admin without redefining the `role` field.
const adminSchema = new mongoose.Schema(
    {
        adminId: { type: String, required: true, unique: true },
        permissions: {
            type: [String],
            default: function () {
                return this.role === "superAdmin"
                    ? ["manageUsers", "manageTests", "viewReports", "configureSettings", "manageAdmins"] // Extended permissions for super admins
                    : ["manageUsers", "manageTests", "viewReports", "configureSettings"];
            },
            enum: [
                "manageUsers",
                "manageTests",
                "viewReports",
                "configureSettings",
                "manageAdmins", // Only for super admins
            ],
        },
        activityLog: [
            {
                action: { type: String },
                date: { type: Date, default: Date.now },
                targetId: { type: mongoose.Schema.Types.ObjectId },
                targetType: { type: String },
            },
        ],
        auditTrail: [
            {
                description: { type: String },
                performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
                timestamp: { type: Date, default: Date.now },
                changes: { type: Object },
            },
        ],
        settings: {
            theme: { type: String, default: "light" },
            language: { type: String, default: "en" },
            maintenanceMode: { type: Boolean, default: false },
            notificationSettings: {
                email: { type: Boolean, default: true },
                push: { type: Boolean, default: true },
            },
        },
        notifications: [
            {
                message: { type: String },
                date: { type: Date, default: Date.now },
                isRead: { type: Boolean, default: false },
            },
        ],

        // List of instructors and students created by this admin
        instructorsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }],
        studentsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
        adminsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }], // For super admins only
    },
    { timestamps: true }
);

// Create the discriminator without redefining the role field
const adminModel = userModel.discriminator("admin", adminSchema);

module.exports = adminModel;
