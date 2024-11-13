const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'No token provided',
                success: false,
                error: true
            });
        }
        // console.log("Token data: ",token);
        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: 'Failed to authenticate token',
                    success: false,
                    error: true
                });
            }

            // Attach user info to request object and proceed to the next middleware
            req.user = decoded;
            req.userId = decoded?._id;
            // console.log("Decoded token data: ", decoded);
            // console.log("decoded id", req.userId);

            next();
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || 'Internal Server Error',
            success: false,
            error: true
        });
    }
}

module.exports = authToken;
