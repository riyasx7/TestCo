let mcqAssessmentAnswers = [];
async function mcqAssessment(req, res) {
  try {
    // Validate the incoming request body
    if (
      !req.body ||
      !req.body.answers ||
      !Array.isArray(req.body.answers) ||
      req.body.answers.length === 0
    ) {
      return res.status(400).json({
        message:
          "No assessment answers provided or the answers format is incorrect!",
        error: true,
        success: false,
      });
    }

    if (!req.body.assessmentId) {
      return res.status(400).json({
        message: "No assessment ID provided!",
        error: true,
        success: false,
      });
    }
    console.log(req.body);
    // Add the assessment data to mcqAssessmentAnswers
    const submission = {
      assessmentId: req.body.assessmentId,
      answers: req.body.answers,
      userId: req.body.userId || null, // Optional user ID if provided
      submittedAt: new Date(),
    };

    mcqAssessmentAnswers.push("submissssion", submission);

    console.log("<<<<<", mcqAssessmentAnswers);
    // Respond with success and include some feedback
    res.status(200).json({
      message: "Assessment data received successfully!",
      success: true,
      submissionId: mcqAssessmentAnswers.length, // Return the submission index
    });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).json({
      message: "Error while processing the MCQ assessment data!",
      error: true,
      success: false,
    });
  }
}
module.exports = mcqAssessment;



