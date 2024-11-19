const adminModel = require("../../models/adminModel");
const bcrypt = require("bcrypt");

async function addNewAdmin(req, res) {
    try {
        const { username, email, password, adminId, role, permissions, settings, createdBy } = req.body;

        // Validate input
        if (!username || !email || !password || !adminId || !role) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        // Validate role (superAdmin or admin)
        if (!["superAdmin", "admin"].includes(role)) {
            return res.status(400).json({
                message: `Invalid role: ${role}. Allowed roles are "superAdmin" and "admin".`,
                success: false,
            });
        }

        // Validate permissions (optional, ensures permissions match enum values)
        const validPermissions = [
            "manageUsers",
            "manageTests",
            "viewReports",
            "configureSettings",
            "manageAdmins", // Permission exclusive to super admins
        ];

        if (permissions) {
            const invalidPermissions = permissions.filter((p) => !validPermissions.includes(p));
            if (invalidPermissions.length > 0) {
                return res.status(400).json({
                    message: `Invalid permissions: ${invalidPermissions.join(", ")}`,
                    success: false,
                });
            }
        }

        // Check for duplicate admin (by email or adminId)
        const existingAdmin = await adminModel.findOne({ $or: [{ email }, { adminId }] });
        if (existingAdmin) {
            return res.status(409).json({
                message: "Admin already exists with this email or adminId!",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new admin document based on role
        const newAdmin = new adminModel({
            username,
            email,
            password: hashedPassword,
            adminId,
            role, // 'superAdmin' or 'admin'
            permissions: permissions || 
                (role === "superAdmin"
                    ? ["manageUsers", "manageTests", "viewReports", "configureSettings", "manageAdmins"] // Permissions for super admin
                    : ["manageUsers", "manageTests", "viewReports", "configureSettings"]), // Default permissions for regular admin
            settings: settings || { theme: "light", language: "en", maintenanceMode: false }, // Default settings
            createdBy: createdBy || null, // Tracks who created this admin
        });

        // Save the admin
        const savedAdmin = await newAdmin.save();

        // Remove sensitive data (password) from response
        savedAdmin.password = undefined;

        res.status(201).json({
            message: `${role} created successfully`,
            success: true,
            admin: savedAdmin,
        });
    } catch (err) {
        console.error("Error saving admin:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message,
        });
    }
}

module.exports = addNewAdmin;
