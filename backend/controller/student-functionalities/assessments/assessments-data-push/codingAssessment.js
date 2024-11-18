const assessmentModel = require("../../../../models/assessmentModel.js");

// Function to fetch assessment data from the database
async function fetchAssessmentData() {
  try {
    const assessments = await assessmentModel.find();
    console.log("Fetched Assessments:", assessments);
    return assessments;
  } catch (error) {
    console.error("Database fetch error:", error.message);
    throw new Error("Failed to fetch data from the database");
  }
}

// Controller for sending assessment data to the frontend
async function codingAssessmentDataPush(req, res) {
  try {
    const assessments = await fetchAssessmentData();

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({
        data: null,
        message: "No assessments found in the database",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      data: assessments,
      message: "Successfully retrieved assessments",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error pushing data to frontend:", error.message);
    res.status(500).json({
      data: null,
      message: error.message || "An unexpected error occurred",
      success: false,
      error: true,
    });
  }
}

module.exports = codingAssessmentDataPush;
