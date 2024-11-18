import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import CodingAssessment from "./add-assessments/assessment_components/CodingAssessment";
import MCQAssessment from "./add-assessments/assessment_components/MCQassessment";

const AssessmentsType = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assessmentType = queryParams.get("type");

  console.log("Assessment-type: ", assessmentType);

  if (assessmentType === "MCQ") {
    return (
      <MCQAssessment/>
    );
  }

  if (assessmentType === "Coding") {
    return <CodingAssessment />;
  }

  return <div className="bg-white">Please select a valid assessment type.</div>; // Fallback message
};

export default AssessmentsType;
