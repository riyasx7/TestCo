import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import Student from '../models/studentModel.js';


export const StudentProfile = async (req, res,userId,Users) => {
  try {
    
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    // Extract token and verify
    const { name, age, gender, contactNumber} = req.body;


    // Create and save the instructor
    const newStudent = new Student({
      userId,
      profile: {
        name,
        age,
        gender,
        contactNumber,
      },
     
    });

    const savedStudent = await newStudent.save();

   await Users.updateOne(
      { _id: userId }, 
      { $set: { profileCompleted: true } } 
  );
  
    res.status(201).json({
      message: 'Instructor created successfully',
      Student: savedStudent,
    });
  } catch (error) {
    console.error('Error creating instructor:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
