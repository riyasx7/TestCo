async function userDetailsController(req, res) {
  try {
    console.log("userID", req.userId);
    console.log("Current User: ",req.user);
    res.status(200).json({
      message: "User details retrieved",
      userId: req.userId,
      data: req.user,
      success: true,
      error: false
    });
    
  } catch (err) {
    res.status(400).json({
      message: err.message || "Something went wrong!",
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
