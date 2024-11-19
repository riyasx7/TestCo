import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../../styles.js";

const studentsList = [
    {
      _id: "S12345",
      student_name: "John Doe",
    },
    {
      _id: "S12346",
      student_name: "Jane Smith",
    },
    {
      _id: "S12347",
      student_name: "Alice Johnson",
    },
    {
      _id: "S12348",
      student_name: "Bob Brown",
    },
  ];

const TableHeader = () => (
  <thead className="h-[4rem] bg-myColor-secondary">
    <tr className="bg-myColor-secondary sticky top-0 z-10">
      {["Serial No.", "Student ID", "Name"].map((header) => (
        <th
          key={header}
          className="py-3 px-5 border-b border-myColor-secondary text-left text-myColor-medium"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const StudentRow = ({ student, index, onClick }) => (
  <tr
    className="h-[4rem] hover:bg-myColor-extraLight text-myColor-primary transition-colors cursor-pointer"
    onClick={() => onClick(student)}
  >
    <td className="py-3 px-5 border-b border-myColor-light">{index + 1}</td>
    <td className="py-3 px-5 border-b border-myColor-light">{student._id}</td>
    <td className="py-3 px-5 border-b border-myColor-light">{student.student_name || "N/A"}</td>
  </tr>
);

const StudentsDetails = () => {
  const navigate = useNavigate();

  // Updated handleRowClick to navigate to SingleStudentDetails
  const handleRowClick = (student) => {
    // Generating query string for dynamic route
    const queryString = new URLSearchParams({
      id: student._id,
      name: student.student_name,
    }).toString();

    navigate(`/instructor/students-details/student?${queryString}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-[5rem] flex flex-row justify-between items-center p-5 bg-myColor-secondary rounded-lg">
        <h1 className={`${styles.montserratBold} text-lg text-myColor-light`}>My Students</h1>
        <button className={`w-[10rem] h-[3rem] bg-myColor-medium hover:bg-myColor-extraLight rounded-lg cursor-pointer ${styles.montserratBold} `}>+ New</button>
      </div>

      <div className="overflow-y-auto max-h-[650px] scrollbar-hide border-0 rounded-lg">
        {studentsList.length === 0 ? (
          <p className="text-center italic text-white">No student details available.</p>
        ) : (
          <table className="min-w-full bg-myColor-light border border-myColor-secondary shadow-myColor-light rounded-lg">
            <TableHeader />
            <tbody>
              {studentsList.map((student, index) => (
                <StudentRow key={student._id} student={student} index={index} onClick={handleRowClick} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentsDetails;
