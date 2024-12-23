
import Instructor from "../models/instructorModel.js";
import User from '../models/userModel.js';
import Courses from '../models/courseModel.js';
import { verifyToken } from "../middleware/verifyToken.js";

export const createStudents = async(req,res)=>{

    try{
      const { error, data: decodedToken } = verifyToken(req);

      if (error) {
        return res.status(403).json({
          message: error,
          success: false,
          error: true,
        });
      }
    const instructorID = decodedToken.userID;

    // Validate user existence
    const user = await User.findById(instructorID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let isInstructor = await Instructor.find({userId:user._id});

    if(!isInstructor)
    {
      return res.status(404).json({
        success:false,
        error:true,
         message: 'Access Denied' });
    }

    const studentsJson = req.body.students

    if (!studentsJson || !Array.isArray(studentsJson)) {
        return res.status(400).json({
          success: false,
          error:true,
          message: "Invalid or missing 'students' in request body.",
        });
      }

    
      for (const student of studentsJson) {
        const {email,courses} = student;        
            await addStudents(email.split('@')[0],email,email.split('@')[0],instructorID,courses);
      }

      res.status(200).json({
        success: true,
        error:false,
        message: "All students processed successfully.",
      });
    }
    catch (error) {
        console.error("Error processing students:", error);
        res.status(500).json({
          success: false,
          error:true,
          message: "Failed to process students.",
        });
      }


}


async function addStudents (userName, email, password, instructorId, courseName) {
  try {
    
      let user = await User.findOne({ email });
      if (!user) {

        let profilepic=''
         profilepic=`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`;
         
          user = new User({
              userName,
              email,
              password,
              role: "Student",
              profile:profilepic,
              createdBy: instructorId,
          });
          await user.save();

      }


      console.log(courseName);

      
      // Find the course by name
      const course = await Courses.findOne({ name: courseName });

     
      console.log("course",course);
      if (!course) {
          return "Course not found." ;
      }

     
      const instructor = await Instructor.findOne({
          userId: instructorId
      });
      
      console.log("instructpr",instructor)

      if (!instructor) {
          return  "Instructor or course not found." 
      }

      
      const result = await Instructor.updateOne(
          {
              userId: instructorId,
              "courses.courseId": course._id,
          },
          {
              $addToSet: { "courses.$.students": user._id },
          }
      );

      if (result.modifiedCount === 0) {
          return "Failed to add student to the course.";
      }

      return "";
  } catch (error) {
      console.error("Error in createStudent:", error);
      return "An error occurred while creating the student.";
  }
};



