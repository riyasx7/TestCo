import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { styles } from "../../../../styles";

const SingleStudentDetails = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState(true);
  console.log(searchParams);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  // Check if id or name are missing and show an error message
  if (!id || !name) {
    return <div>No student details found.</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-[5rem] flex flex-row justify-between items-center p-5 bg-myColor-secondary rounded-lg">
      <h1 className={`${styles.montserratBold} text-lg text-myColor-light`}>My Students /{" "}<span className={`${styles.montserratRegular}`}>{name}</span></h1>
      <button className={`w-[10rem] h-[3rem] bg-myColor-medium hover:bg-myColor-extraLight rounded-lg cursor-pointer ${styles.montserratBold} `}>Back</button>
      </div>
      <div className="w-[100%] h-[40rem] p-5 rounded-lg bg-myColor-secondary">
        {isLoading ? (
          <p>Loading...</p>
        ) : studentDetails ? (
          <div>
            <div className="w-[20rem] h-[5rem] flex justify-center items-center bg-myColor-light rounded-lg"><p>Student ID: {id}</p></div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default SingleStudentDetails;
