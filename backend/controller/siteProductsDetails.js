const userModel = require("../models/userStudentModel");
const productModel = require("../models/userInstructorModule"); // Ensure this path is correct

async function siteProductsDetails(req, res) {
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

        console.log("User is an admin, fetching all products...");

        const allProducts = await productModel.find(); 
        console.log("All product details fetched successfully.");

        
        if (!allProducts|| allProducts.length === 0) {
            return res.status(404).json({
                message: "No products found!",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            message: "All products fetched successfully!",
            data: allProducts,  
            success: true,
        });
        
    } catch (err) {
        console.error("Error in siteProductsDetails:", err.message);  
        res.status(500).json({
            message: "Internal server error.",
            error: true,
            success: false,
        });
    }
}

module.exports = siteProductsDetails;
