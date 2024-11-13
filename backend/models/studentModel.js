const mongoose = require("mongoose");
const { userModel } = require("./userModel"); // Import the base user model

// Define the student schema, inheriting from userModel
const studentSchema = new mongoose.Schema(
    {
        // Professional & Institutional Information
        studentId: { type: String, required: true },
        department: { type: String },
        qualification: { type: String },
        yearOfStudy: { type: Number },

        coursesEnrolled: {
            type: [String],  // Array of course names or course IDs the student is enrolled in
            default: [],
        },
        grade: {
            type: String,
            default: "",
        },
        performance: {
            type: Object,
            default: {},
        },
    },
    { timestamps: true }
);

// Create the student model using the base userModel and add the 'Student' discriminator
const studentModel = userModel.discriminator("Student", studentSchema);

module.exports = studentModel;
