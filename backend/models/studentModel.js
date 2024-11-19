const mongoose = require("mongoose");
const userModel = require("./userModel"); // Import the base user model

// Define the student schema
const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    department: { type: String },
    qualification: {
      type: String,
      enum: ["Bachelor", "Master", "Diploma", "PhD"],
      default: "Bachelor",
    },
    yearOfStudy: { type: Number, min: 1, max: 5 },
    instructorId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }], // Array of instructors teaching this student

    // Unified structure for assessments
    assessments: [
      {
        assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment" },
        scheduledDate: { type: Date }, // Scheduled date of the assessment
        completionDate: { type: Date }, // Date of completion (if applicable)
        score: { type: Number, default: null }, // Score (null if not yet completed)
        status: {
          type: String,
          enum: ["assigned", "completed", "missed"],
          default: "assigned",
        }, // Status: "assigned", "completed", or "missed"
        feedback: { type: String, default: "" }, // Optional feedback after completion
        description: { type: String, default: "" }, // Description of the assessment
      },
    ],

    // Reference to the user (either Instructor or Admin) who created the student
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", // This can refer to either an Instructor or Admin
      required: true 
    },
  },
  { timestamps: true }
);

// Apply unique index for studentId
studentSchema.index({ studentId: 1 }, { unique: true });

// Define the discriminator for student model based on user model
const studentModel = userModel.discriminator("Student", studentSchema);

module.exports = studentModel;
