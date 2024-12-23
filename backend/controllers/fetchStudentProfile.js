import Student from "../models/studentModel.js";

export const fetchStudentDetails = async (req, res,userId) => {
  try {
    
    // Fetch the specific student by userId
    const student = await Student.findOne({ userId })
      .populate('userId', 'email') // Populate userId to get email
      .exec();

    // Check if the student exists
    if (!student) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Student not found",
      });
    }

    // Format the Response
    const formattedResponse = {
      userId: student.userId._id,
      email: student.userId.email,
      profile: {
        name: student.profile.name,
        age: student.profile.age,
        gender: student.profile.gender,
        contactNumber: student.profile.contactNumber,
      },
    };

    // Send the Response
    res.status(200).json({
      success: true,
      error: false,
      details: formattedResponse,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "An error occurred while fetching student details",
    });
  }
};
