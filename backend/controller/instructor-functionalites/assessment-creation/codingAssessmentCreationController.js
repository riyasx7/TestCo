const assessmentModel = require("../../../models/assessmentModel");

async function createAssessment(req, res) {
  try {
    const { assessmentType, title, numQuestions, questions, description } = req.body;
    console.log("Received payload:");
    console.log(req.body);

    // Validate required fields
    if (
      !assessmentType ||
      !title ||
      !numQuestions ||
      !questions ||
      questions.length !== numQuestions
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data, please check the form." });
    }

    let newAssessmentData = {
      assessmentType,
      title,
      description, // Optional
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log("Empty assessment data created");

    // Handle MCQ questions
    if (assessmentType === "MCQ") {
      if (!Array.isArray(questions)) {
        return res.status(400).json({ message: "Questions should be an array." });
      }

      const mcqQuestions = questions.map((q) => {
        if (!q.question || !q.options || q.options.length === 0) {
          throw new Error("Each MCQ must have a question and options.");
        }

        const options = q.options.map((option) => {
          if (!option.option || typeof option.isCorrect !== 'boolean') {
            throw new Error("Each option must have text and a correctness flag.");
          }

          return {
            option: option.option,
            isCorrect: option.isCorrect,
          };
        });

        return {
          question: q.question,
          options: options,
        };
      });

      newAssessmentData.mcqQuestions = mcqQuestions; // Only set for MCQ
    }

    // Handle Coding assessments
    if (assessmentType === "Coding") {
      if (!Array.isArray(questions)) {
        return res.status(400).json({ message: "Questions should be an array." });
      }

      const codingAssessments = questions.map((q) => {
        if (!q.problemStatement || !Array.isArray(q.testCases) || q.testCases.length === 0) {
          throw new Error("Each coding question must have a problem statement and test cases.");
        }

        const testCases = q.testCases.map((testCase) => {
          if (!testCase.input || !testCase.expectedOutput) {
            throw new Error("Each test case must have input and expected output.");
          }

          return {
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
          };
        });

        return {
          problemStatement: q.problemStatement,
          testCases: testCases,
        };
      });

      newAssessmentData.codingAssessments = codingAssessments; // Only set for Coding
      console.log("Coding assessment data filled");
    }

    // Create a new assessment object
    const newAssessment = new assessmentModel(newAssessmentData);
    console.log("Assessment model created");

    // Save the assessment to the database
    const savedAssessment = await newAssessment.save();
    console.log("Assessment saved");

    // Return the saved assessment
    return res.status(201).json(savedAssessment);
  } catch (error) {
    console.error("Error creating assessment:", error.message || error);
    return res.status(500).json({
      message: "Server error. Could not create the assessment.",
      error: error.message || error,
    });
  }
}

module.exports = createAssessment;
