import mongoose from 'mongoose';

const InstructorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  profile: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    contactNumber: { type: String, required: true },
  },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true },
      name: { type: String, required: true },
      students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: [] }],
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Instructor = mongoose.model('Instructor', InstructorSchema);

export default Instructor;
