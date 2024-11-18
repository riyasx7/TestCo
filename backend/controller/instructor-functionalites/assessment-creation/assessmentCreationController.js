const assessmentModel = require("../../../models/assessmentModel");

async function createAssessment(req, res) {
  try {
    const { assessmentType, title, numQuestions, questions, description } = req.body;

    console.log("Received payload:", req.body);

    // Validate required fields
    if (!assessmentType || !title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid data, please check the form." });
    }

    if (questions.length !== numQuestions) {
      return res.status(400).json({ message: "Number of questions mismatch." });
    }

    // Initialize assessment data
    let newAssessmentData = {
      assessmentType,
      title,
      description: description || "No description provided.",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Handle MCQ assessments
    if (assessmentType === "MCQ") {
      const mcqQuestions = questions.map((q) => {
        if (!q.question || !Array.isArray(q.options) || q.options.length === 0) {
          throw new Error("Each MCQ must have a question and at least one option.");
        }

        // Validate options
        const options = q.options.map((option) => {
          if (!option.option || typeof option.isCorrect !== "boolean") {
            throw new Error("Each option must have text and a correctness flag.");
          }

          return {
            option: option.option, // Align field name with schema
            isCorrect: option.isCorrect,
          };
        });

        // Ensure at least one correct option
        if (!options.some((opt) => opt.isCorrect)) {
          throw new Error("Each MCQ must have at least one correct option.");
        }

        return {
          question: q.question,
          options,
        };
      });

      newAssessmentData.mcqQuestions = mcqQuestions; // Add MCQ-specific data
    }

    // Handle Coding assessments
    else if (assessmentType === "Coding") {
      const codingAssessments = questions.map((q) => {
        if (!q.problemStatement || !Array.isArray(q.testCases) || q.testCases.length === 0) {
          throw new Error("Each coding question must have a problem statement and at least one test case.");
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
          testCases,
        };
      });

      newAssessmentData.codingAssessments = codingAssessments; // Add Coding-specific data
    } else {
      return res.status(400).json({ message: "Invalid assessment type. Use 'MCQ' or 'Coding'." });
    }

    // Create a new assessment object
    const newAssessment = new assessmentModel(newAssessmentData);
    console.log("Assessment model created");

    // Save the assessment to the database
    const savedAssessment = await newAssessment.save();
    console.log("Assessment saved");

    // Return the saved assessment
    return res.status(201).json({
      message: "Assessment created successfully.",
      assessment: savedAssessment,
    });
  } catch (error) {
    console.error("Error creating assessment:", error.message || error);
    return res.status(500).json({
      message: "Server error. Could not create the assessment.",
      error: error.message || error,
    });
  }
}

module.exports = createAssessment;
