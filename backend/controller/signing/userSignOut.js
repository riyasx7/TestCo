async function userSignOutController(req, res) {
    try {
        // Check if the token exists in the cookies
        if (req.cookies.token) {
            // Clear the token cookie
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Secure cookie in production
                sameSite: "Strict", // Prevent CSRF attacks
                path: "/" // Ensure it applies to all routes
            });
        }

        // Send a success response indicating sign-out completion
        res.json({
            message: "Signed out successfully!",
            error: false,
            success: true,
            data: [],
        });
    } catch (err) {
        // Log and handle any errors during the sign-out process
        console.error(err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignOutController;
