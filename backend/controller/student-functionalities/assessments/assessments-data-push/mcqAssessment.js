const assessmentModel = require("../../../../models/assessmentModel.js");

// Function to fetch MCQ assessment data from the database
async function fetchMCQAssessmentData() {
  try {
    const mcqAssessments = await assessmentModel.find({ assessmentType: "MCQ" }); // Filter only MCQ assessments
    console.log("Fetched MCQ Assessments:", mcqAssessments);
    return mcqAssessments;
  } catch (error) {
    console.error("Database fetch error for MCQ assessments:", error.message);
    throw new Error("Failed to fetch MCQ data from the database");
  }
}

// Controller for sending MCQ assessment data to the frontend
async function mcqAssessmentDataPush(req, res) {
  try {
    const mcqAssessments = await fetchMCQAssessmentData();

    if (!mcqAssessments || mcqAssessments.length === 0) {
      return res.status(404).json({
        data: null,
        message: "No MCQ assessments found in the database",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      data: mcqAssessments,
      message: "Successfully retrieved MCQ assessments",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error pushing MCQ data to frontend:", error.message);
    res.status(500).json({
      data: null,
      message: error.message || "An unexpected error occurred",
      success: false,
      error: true,
    });
  }
}

module.exports = mcqAssessmentDataPush;
