const mongoose = require("mongoose");
const { userModel } = require("./userModel");  // Import the base userModel

// Define the instructor-specific schema fields
const instructorSchema = new mongoose.Schema({
    // Professional & Institutional Information
    employeeId: { type: String, required: true },
    department: { type: String },
    qualification: { type: String },
    experience: { type: Number },

    // Platform-Specific Information
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    testsCreated: [
        {
            testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
            courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
            testName: { type: String },
            createdOn: { type: Date },
            numberOfQuestions: { type: Number },
            averageScore: { type: Number }
        }
    ],
    studentsMonitored: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    notifications: [
        {
            message: { type: String },
            date: { type: Date },
            isRead: { type: Boolean, default: false }
        }
    ],
    preferences: {
        notifications: { type: Boolean, default: true },
        darkMode: { type: Boolean, default: false },
        preferredLanguage: { type: String, default: "en" }
    },

    // Metadata
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Create the instructor model by using discriminator on the userModel
const instructorModel = userModel.discriminator("Instructor", instructorSchema);

module.exports = instructorModel;
