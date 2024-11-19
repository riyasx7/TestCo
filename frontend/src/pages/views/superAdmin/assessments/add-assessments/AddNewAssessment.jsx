import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { styles } from "../../../../../styles.js";

const AddNewAssessment = () => {
  const [assessmentType, setAssessmentType] = useState(""); // Single value for selection
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the default page if no assessment type is selected
    if (!assessmentType) {
      navigate(`/instructor/assessments/add-new-assessment`);
    }
  }, [assessmentType, navigate]);

  const handleChange = async (e) => {
    const selectedType = e.target.value;
    setAssessmentType(selectedType);
    if (!selectedType) {
      navigate(`/instructor/assessments/add-new-assessment`);
    } else if (["MCQ", "Coding"].includes(selectedType)) {
      navigate(
        `/instructor/assessments/add-new-assessment/assessment-type?type=${selectedType}`
      );
    } else {
      setError("Invalid assessment type selected.");
      setAssessmentType(""); // Reset to empty if invalid
    }
  };

  const goBack = async () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header Section */}
      <div className="w-full h-[5rem] flex flex-row justify-between items-center p-5 bg-myColor-secondary rounded-lg">
        <h1 className={`${styles.montserratBold} text-lg text-myColor-light`}>
          Assessments /{" "}
          <span className={`${styles.montserratLight}`}>add new</span>
        </h1>
        <div className="flex flex-row justify-center items-center gap-10">
          <select
            id="assessment-type"
            name="assessment-type"
            value={assessmentType}
            onChange={handleChange}
            className="w-[20rem] h-[3rem] bg-myColor-extraLight text-myColor-primary border border-myColor-medium rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-myColor-medium transition-all cursor-pointer"
          >
            <option className={`cursor-pointer`} value="">
              --Select assessment type--
            </option>
            <option className={`cursor-pointer`} value="MCQ">
              MCQ
            </option>
            <option className={`cursor-pointer`} value="Coding">
              Coding
            </option>
          </select>

          <button
            disabled={!assessmentType}
            className={`w-[10rem] h-[3rem] ${assessmentType ? "bg-myColor-medium hover:bg-myColor-extraLight" : "bg-gray-300 cursor-not-allowed"} rounded-lg cursor-pointer ${styles.montserratBold}`}
            onClick={goBack}
          >
            Back
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full h-[10rem] flex justify-center items-center rounded-lg bg-red-100 p-4">
          <h1 className="text-red-500">{error}</h1>
        </div>
      )}

      {/* Instructional Message */}
      {!assessmentType && !error && (
        <div className="w-full h-[35rem] flex justify-center items-center rounded-lg bg-myColor-extraLight p-4">
          <h1 className={`${styles.montserratLight} text-xl`}>
            Select the assessment type, to create one!
          </h1>
        </div>
      )}

      {/* Dynamic Child Route Render */}
      {assessmentType && !error && (
         <Outlet />
      )}
    </div>
  );
};

export default AddNewAssessment;
