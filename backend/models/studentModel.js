import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  profile: {
    name: { type: String},
    age: { type: Number},
    gender: { type: String, enum: ['male', 'female', 'other']},
    contactNumber: { type: String},
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Student = mongoose.model('Students', StudentSchema);

export default Student;
