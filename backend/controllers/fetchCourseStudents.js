import Instructor from '../models/instructorModel.js'; 
import { verifyToken } from '../middleware/verifyToken.js';
import Courses from '../models/courseModel.js';
import Users from '../models/userModel.js';

export const fetchCourseStudents = async (req, res) => {
  try {
    const { error, data: decodedToken } = verifyToken(req);

    if (error) {
      return res.status(403).json({
        message: error,
        success: false,
        error: true,
      });
    }

    const { courseName } = req.body;
    const course = await Courses.findOne({ name: courseName });

    if (!course) {
      return res.status(500).json({ 
        success: false,
        error: true,
        message: "Course not available"
      });
    }

    const instructor = await Instructor.findOne(
      { userId: decodedToken.userID, 'courses.courseId': course._id },
      { 'courses.$': 1 } // This selects only the course you're interested in
    ).populate({
      path: 'courses.students', 
      select: 'userName email profile -_id', 
      model: Users, 
    });

    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Instructor or course not found.',
      });
    }



    // Extract the students from the course
    const students = instructor.courses[0]?.students;

    if (students && students.length > 0) {
      return res.status(200).json({
        success: true,
        error: false,
        students: students,
      });
    } else {
      return res.status(404).json({
        success: true,
        error: false,
        message: 'No students were added to this course',
      });
    }

  } catch (error) {
    console.error("Error fetching course students:", error);
    return res.status(500).json({ 
      success: false,
      error: true,
      message: `Server error: ${error.message}. Please try again later.`,
    });
  }
};
