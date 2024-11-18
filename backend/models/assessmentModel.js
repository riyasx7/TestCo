const mongoose = require("mongoose");
console.log("Entered assessment model");

// MCQ Option Schema (used for each option in MCQ questions)
const mcqOptionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }, // Marks the correct option
});

// MCQ Question Schema
const mcqQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [mcqOptionSchema],
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "An MCQ question must have at least one option.",
    },
  }, // Array of options
});

// Coding Test Case Schema
const codingTestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
});

// Coding Question Schema (allowing multiple questions in coding assessments)
const codingQuestionSchema = new mongoose.Schema({
  problemStatement: { type: String, required: true },
  testCases: {
    type: [codingTestCaseSchema],
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "Coding questions must have at least one test case.",
    },
  }, // Array of test cases
});

// Assessment Schema (Main Schema)
const assessmentSchema = new mongoose.Schema(
  {
    assessmentType: {
      type: String,
      enum: ["MCQ", "Coding"], // Can be either MCQ or Coding
      required: true,
    },
    title: { type: String, required: true }, // Title of the assessment
    description: { type: String, default: "No description available." }, // Optional description with default value
    mcqQuestions: {
      type: [mcqQuestionSchema],
      required: function () {
        return this.assessmentType === "MCQ"; // Only required if assessment type is MCQ
      },
    }, // Only for MCQ assessments
    codingAssessments: {
      type: [codingQuestionSchema],
      required: function () {
        return this.assessmentType === "Coding"; // Only required if assessment type is Coding
      },
    }, // Array of coding questions for Coding assessments
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Adding a pre-validation hook to check that either mcqQuestions or codingAssessments is provided based on assessmentType
assessmentSchema.pre("validate", function (next) {
  if (this.assessmentType === "MCQ" && (!this.mcqQuestions || this.mcqQuestions.length === 0)) {
    next(new Error("MCQ assessments must contain at least one question."));
  } else if (this.assessmentType === "Coding" && (!this.codingAssessments || this.codingAssessments.length === 0)) {
    next(new Error("Coding assessments must have at least one coding question with test cases."));
  } else {
    next();
  }
});

// Create an index on the title field to optimize searches by title
assessmentSchema.index({ title: 1 });

// Create the model from the schema
const assessmentModel = mongoose.model("Assessment", assessmentSchema);

module.exports = assessmentModel;
