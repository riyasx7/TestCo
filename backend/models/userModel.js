import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Instructor', 'Admin','SuperAdmin'], required: true },
    profile: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    profileCompleted: { type: Boolean, default: false }, 
   
});

const Users = mongoose.model('Users', userSchema);

export default Users;
