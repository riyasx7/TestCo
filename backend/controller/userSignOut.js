async function userSignOutController(req, res) {
    try {
        if (req.cookies.token) { 
            res.clearCookie("token"); 
        }
        res.json({
            message: "Signed out successfully!",
            error: false,
            success: true,
            data: [],
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignOutController;
