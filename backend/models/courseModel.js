import mongoose, { Schema } from "mongoose";

export const courseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category:{type: String, required: true},
    createdAt: { type: Date, default: Date.now }, 
    createdBy: { type: String, required: true }  
});

const Courses = mongoose.model('Courses', courseSchema);

export default Courses;
