
import Assessment from "../models/assessmentModel.js";
import Courses from '../models/courseModel.js';
import Instructor from "../models/instructorModel.js";
import { v4 as uuidv4 } from 'uuid';


export const createAssessment = async (req, res) => {
    try {
      
      const { error, data: decodedToken } = verifyToken(req);

      if (error) {
        return res.status(403).json({
          message: error,
          success: false,
          error: true,
        });
      }
      const instructorId = decodedToken.userID;
  
      
      
      const instructor = await Instructor.find({userId : instructorId});
      if (!instructor) {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
     
      
      const { title, description, questions, scheduledAt, duration, totalMarks, course } = req.body;

      const courses = await Courses.findOne({ name: course });

     
      if (!courses) {
        return res.status(403).json({ error: 'Course not found' });
      }

     
      const selectedInstructor = await Instructor.findOne({ userId: instructorId }).exec();
      
      if (!selectedInstructor) {
        return res.status(404).json({ error: 'Instructor not found' });
      }
      
      // Manually filter the courses array to match the desired course ID
      const selectedCourse = selectedInstructor.courses.find(
        (course) => course.courseId.toString() === courses._id.toString()
      );
      
      if (!selectedCourse) {
        return res.status(404).json({ error: 'Course not found for the instructor' });
      }
      
      // Extract the student IDs from the selected course
      const studentIds = selectedCourse.students;

      
     
      // Validate required fields
      if (!title  || !questions || !scheduledAt || !duration || !totalMarks) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Validate the questions array
      for (const question of questions) {
        if (!question.questionType || !question.questionText) {
          return res.status(400).json({ error: 'Invalid question structure' });
        }
  
        if (question.questionType === 'MCQ' && (!question.options || !question.correctAnswer)) {
          return res.status(400).json({ error: 'MCQ must include options and a correct answer' });
        }
  
        if (question.questionType === 'Coding' && (!question.codingSkeleton || !question.testCases)) {
          return res.status(400).json({ error: 'Coding questions must include starter code and test cases' });
        }
      }

      const assessmentId = uuidv4();
  
      // Create a new assessment object
      const newAssessment = new Assessment({
        assessmentId,
        title,
        description,
        createdBy: instructorId,
        questions,
        scheduledAt,
        duration,
        totalMarks,
        course:courses._id,
        allowedStudents :studentIds
      });
  
      // Save the assessment to the database
      const savedAssessment = await newAssessment.save();
  
      res.status(201).json({
        message: 'Assessment created successfully',
        assessment: savedAssessment
      });
    } catch (error) {
      console.error('Error creating assessment:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };