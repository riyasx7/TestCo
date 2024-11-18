import React, { useState } from "react";
import { styles } from "../../../../styles";
import { useNavigate } from "react-router-dom";

const AssessmentsLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    navigate(`/instructor/assessments/add-new-assessment`);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-[5rem] flex flex-row justify-between items-center p-5 bg-myColor-secondary rounded-lg">
        <h1 className={`${styles.montserratBold} text-lg text-myColor-light`}>
          Assessments
        </h1>
        <button
          className={`w-[10rem] h-[3rem] bg-myColor-medium hover:bg-myColor-extraLight rounded-lg cursor-pointer ${styles.montserratBold} `}
          onClick={handleClick}
        >
          + New
        </button>
      </div>
      <div className="w-[100%] h-[40rem] p-5 rounded-lg bg-myColor-secondary">
        {isLoading ? (
          <p>Loading...</p>
        ) : studentDetails ? (
          <div>
            <div className="w-[20rem] h-[5rem] flex justify-center items-center bg-myColor-light rounded-lg">
              <p>Student ID: {id}</p>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default AssessmentsLayout;
