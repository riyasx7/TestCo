import Instructor from "../models/instructorModel.js";

export const fetchInstructorProfile = async (req, res, userId) => {
  try {
    // Fetch instructor data and populate required fields
    const instructor = await Instructor.findOne({ userId })
      .populate('userId', 'email profile role') // Include profileImage and role
      .populate('courses.courseId', 'name description') 
      .populate('courses.students'); 

    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Instructor not found"
      });
    }

    // Format the response
    const formattedResponse = {
      name: instructor.profile.name,
      email: instructor.userId.email,
      age: instructor.profile.age,
      profileImage: instructor.userId.profile,
      role: instructor.userId.role, // Access directly from populated data
      gender: instructor.profile.gender,
      contactNumber: instructor.profile.contactNumber,
      courses: instructor.courses.map(course => ({
        name: course.name,
        students: course.students, 
      })),
    };

    // Send the formatted response
    res.status(200).json({
      success: true,
      error: false,
      message: "Instructor details",
      user: formattedResponse,
    });
  } catch (error) {
    console.error("Error fetching instructor profile:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "An error occurred while fetching the instructor profile",
    });
  }
};
