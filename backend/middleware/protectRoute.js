import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Unauthorized - No Token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized - Invalid Token" });
      }

      const user = await User.findById(decoded.userID).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the user's role is allowed
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden - Access Denied" });
      }

      req.user = user; // Attach the user to the request object
      next();
    } catch (error) {
      console.error("Error in protection middleware", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
