const mongoose = require("mongoose");
const userModel = require("./userModel"); // Import the base user model

// Define the instructor schema
const instructorSchema = new mongoose.Schema(
    {
        instructorId: { type: String, required: true }, // Unique identifier for the instructor
        department: { type: String }, // Department name
        specialization: { type: String }, // Area of expertise or specialization
        experience: { type: Number, default: 0 }, // Years of teaching or professional experience
        bio: { type: String, default: "" }, // A short biography or description

        // Reference to the admin who created the instructor
        createdBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", // This will reference an Admin (or other User types if needed)
            required: true 
        },
        
        // Initially empty array of students, will be populated when the instructor adds students
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student", default: [] }], // References students under the instructor
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the instructor model using the base userModel and add the 'Instructor' discriminator
const instructorModel = userModel.discriminator("Instructor", instructorSchema);

module.exports = instructorModel;