
// export const verifyToken = (req,res) => {
//     const token = req.cookies.token; 
//     if (!token) {
//         return res.status(401).json({ message: "No token provided. Unauthorized." });
//     }

//     try {
        
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         return decoded
        
//     } catch (err) {
//         return res.status(403).json({ message: "Invalid or expired token." });
//     }
// };



