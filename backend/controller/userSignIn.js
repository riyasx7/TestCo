const userModel = require("../models/userStudentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide email", error: true, success: false });
    }
    if (!password) {
      return res.status(400).json({ message: "Please provide password", error: true, success: false });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true, success: false });
    }

    console.log("Signed in user's details: ", user);

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Password is incorrect!", error: true, success: false });
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8, // 8 hours
    });

    const tokenOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      sameSite: "Strict", // Prevents CSRF attacks
      path: "/", // Ensure it's sent on all routes
    };

    res.cookie("token", token, tokenOption).json({
      message: "Sign in successfully completed!",
      data: token,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err); // Log the actual error
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
