const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

async function userSignUpController(req, res) {
  try {
    const { username, email, password, role } = req.body;

    // Check for valid role (either 'student' or 'instructor')
    if (!role || (role !== 'student' && role !== 'instructor')) {
      return res.status(400).json({
        message: "Invalid role provided. Only 'student' or 'instructor' roles are allowed.",
        error: true,
        success: false,
      });
    }

    // Check if the email already exists in the database
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email!",
        error: true,
        success: false,
      });
    }

    // Check for required fields
    if (!username) {
      return res.status(400).json({
        message: "Please provide username",
        error: true,
        success: false,
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Please provide email",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Please provide password",
        error: true,
        success: false,
      });
    }

    // Hash the password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword;
    try {
      hashPassword = bcrypt.hashSync(password, salt);
    } catch (error) {
      return res.status(500).json({
        message: "Password hashing failed.",
        error: true,
        success: false,
      });
    }

    // Prepare the payload for the new user
    const payload = {
      ...req.body,
      password: hashPassword,
    };

    // Create the new user
    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      status: true,
      error: false,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message || "Data not received",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
