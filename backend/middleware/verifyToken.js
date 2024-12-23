import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  try {
    // Retrieve token from headers (adjust header format as needed)
    const token = req.headers?.authorization?.split(" ")[1];

    //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzQ0OTI3OGViNmQyMjgxYTgwYTdhMzAiLCJlbWFpbCI6ImJ1ZHJhQGV4YW1wbGUuY29tIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MzI4OTU1OTEsImV4cCI6MTczMzU4Njc5MX0.LFc_W3_YJrCG5YsXMqhaV3zYQV05ZVtC3seHNmbTW0g";

    // If no token is provided
    if (!token) {
      return { error: 'No token provided' };
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Return the decoded token
    return { data: decoded };
  } catch (err) {
    // Handle verification errors
    return { error: 'Failed to authenticate token' };
  }
};
