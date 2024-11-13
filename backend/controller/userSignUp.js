const userModel = require("../models/userStudentModel");
const bcrypt = require("bcrypt");

async function userSignUpController(req, res) {
  console.log(req.protocol);
  console.log("req.body: ", req.body);
  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User already exists!");
    }

    if (!username) {
      throw new Error("Please provide Username");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    console.log("empty checked");

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword;

    try {
      hashPassword = bcrypt.hashSync(password, salt);
    } catch (error) {
      throw new Error("Password hashing failed.");
    }

    console.log("hashing done");

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };
    console.log("payload ready");
    console.log("payload role: ",payload.role);

    const userData = new userModel(payload);
    console.log("new user model created");

    const saveUser = await userData.save();
    console.log("userDATA: ", saveUser);
    console.log("saved user");

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
