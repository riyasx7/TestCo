const assessmentModel = require("../../../../models/assessmentModel.js");

async function codingAssessmentDataPull() {
  try {
    // Await the result of the find() method
    const currentAssessment = await assessmentModel.find();
    console.log("<<<>>>",currentAssessment);
    return currentAssessment;
  } catch (e) {
    console.error("Error fetching data from DB:", e.message);
    throw new Error(e.message || "Failed to fetch data from the database");
  }
}

async function codingAssessmentDataPush(req, res) {
  try {
    const assessmentData = await codingAssessmentDataPull();

    if (!assessmentData || assessmentData.length === 0) {
      throw new Error("No assessments found in the database");
    }

    res.status(200).json({
      data: assessmentData,
      message: "Successfully pushed data to frontend!",
      success: true,
      error: false,
    });
  } catch (e) {
    console.error("Error pushing data to frontend:", e.message);
    res.status(500).json({
      data: null,
      message: e.message || "An unexpected error occurred",
      success: false,
      error: true,
    });
  }
}

module.exports = codingAssessmentDataPush;
