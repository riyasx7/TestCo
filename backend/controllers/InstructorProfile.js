
import Instructor from "../models/instructorModel.js";

import Course from '../models/courseModel.js';
import Users from '../models/userModel.js';
export const InstructorProfile = async (req, res , userId) => {
  try {

  
    // Extract token and verify
    const { name, age, gender, contactNumber, courses } = req.body;

   
    // Validate courses
    const courseDocs = await Course.find({ name: { $in: courses } });
    if (!courseDocs || courseDocs.length === 0) {
      return res.status(404).json({ error: 'No matching courses found' });
    }

    
    const instructorCourses = courseDocs.map(course => ({
      courseId: course._id,
      name: course.name,
      students: [], 
    }));

    // Create and save the instructor
    const newInstructor = new Instructor({
      userId,
      profile: {
        name,
        age,
        gender,
        contactNumber,
      },
      courses: instructorCourses,
    });

    const savedInstructor = await newInstructor.save();

   await Users.updateOne(
      { _id: userId }, 
      { $set: { profileCompleted: true } } 
  );
  
    res.status(200).json({
      success:true,
      message: 'Instructor created successfully',
      instructor: savedInstructor,
    });
  } catch (error) {
    console.error('Error creating instructor:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
