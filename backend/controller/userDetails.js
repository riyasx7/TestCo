const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      message: "No token provided",
      error: true,
      success: false
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.userId = decoded._id;
    req.user = decoded;  // Here, 'decoded' will contain user details like username, role, etc.
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
      error: true,
      success: false
    });
  }
}

module.exports = authenticate;
