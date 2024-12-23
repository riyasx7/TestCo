import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true, unique: true },
  title: { type: String, required: true }, // Assessment title
  description: { type: String }, // Optional description of the assessment
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructors', required: true },
  // createdBy: { type: String, required: true } ,// Instructor creating the assessment
  questions: [
    {
      questionType: { type: String, enum: ['MCQ', 'Coding'], required: true }, // Type of question
      questionText: { type: String, required: true }, // Question text
      options: [{ type: String }], // Options for MCQ
      correctAnswer: { type: String }, // Correct answer for MCQ
      codingSkeleton: { type: String }, // Starter code for coding questions
      testCases: [
        {
          input: { type: String }, // Input for coding test case
          expectedOutput: { type: String } // Expected output for coding test case
        }
      ]
    }
  ],
  course:{type: mongoose.Schema.Types.ObjectId , required:true},
  allowedStudents:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}],
  scheduledAt: { type: Date, required: true }, // Scheduled date and time of the assessment
  duration: { type: Number, required: true }, // Duration in minutes
  totalMarks: { type: Number, required: true }, // Total marks for the assessment
  createdAt: { type: Date, default: Date.now }, // When the assessment was created
  updatedAt: { type: Date, default: Date.now } // Last updated time
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);

export default Assessment;

