const userModel = require("../models/userModel");

async function updateUserDetails(req, res) {
  try {
    const sessionUser = req.userId; // For authentication, if needed
    const { userId, field, value } = req.body; // Assuming frontend sends the field and new value for the update

    if (!userId || !field || !value) {
      return res.status(400).json({
        message: "Invalid input. Please provide valid user ID, field, and value.",
        error: true,
        success: false,
      });
    }

    // Constructing the update payload dynamically
    const payload = {
      [field]: value, // Dynamically setting the field to update based on frontend input
    };

    // Update the user and return the new document
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      payload,
      { new: true } // This ensures the updated user document is returned
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.json({
      data: updatedUser,
      message: "User details updated successfully",
      error: false,
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Something went wrong!",
      error: true,
      success: false,
    });
  }
}

module.exports = updateUserDetails;
