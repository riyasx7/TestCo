const userModel = require("../models/userModel"); // Ensure this path is correct

async function siteUsersDetails(req, res) {
    try {
        // Ensure the user is authenticated by checking userId
        if (!req.userId) {
            console.log("User ID not found!"); // Log for debugging
            return res.status(403).json({
                message: "User ID not found!",
                error: true,
                success: false,
            });
        }

        // Fetch the requesting user's details from the database
        const requestingUser = await userModel.findById(req.userId);

        // If the user is not found or not an admin, return an error response
        if (!requestingUser || requestingUser.role !== 'ADMIN') {
            console.log(`Access denied for user: ${req.userId}, Role: ${requestingUser ? requestingUser.role : 'Unknown'}`);
            return res.status(403).json({
                message: "Access denied! Only admins can access this resource.",
                error: true,
                success: false,
            });
        }

        console.log("User is an admin, fetching all users...");

        // Fetch all users from the database
        const allUsers = await userModel.find({}, '-password'); // Exclude password for security
        console.log("All user details fetched successfully.");

        // If no users are found, return a 404 response
        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({
                message: "No users found!",
                error: true,
                success: false,
            });
        }

        // Return the fetched users as a response
        res.status(200).json({
            message: "All users fetched successfully!",
            data: allUsers, // Send the fetched user data
            success: true,
        });
        
    } catch (err) {
        console.error("Error in siteUsersDetails:", err.message); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error.",
            error: true,
            success: false,
        });
    }
}

module.exports = siteUsersDetails;
