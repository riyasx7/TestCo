import React, { useState } from "react";
import { styles } from "../../../../styles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";

const AssessmentsLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    navigate(`/instructor/assessments/add-new-assessment`);
  };

  return (
    <section className="w-full flex flex-col gap-5">
      {/* Header Section */}
      <div className="w-full h-[5rem] flex flex-col sm:flex-row justify-between items-center p-5 bg-myColor-secondary rounded-lg">
        <h1 className={`${styles.montserratBold} text-lg sm:text-xl text-myColor-light`}>
          Assessments
        </h1>
        <motion.button
                  variants={fadeIn("center", "", 0.5, 0.25)}
                  initial="hidden"
                  animate="show"
                  whileTap={{scale: 0.95}}
                  whileHover={{scale: 1.025}}
                  transition={{
                    duration: 0.02,  
                    ease: "easeInOut", 
                  }}
          className={` sm:w-[4rem] md:w-[6rem] lg:w-[8rem] h-[3rem] bg-myColor-medium hover:bg-myColor-extraLight rounded-lg cursor-pointer ${styles.montserratBold}`}
          onClick={handleClick}
        >
          + New
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="w-full h-[40rem] sm:h-[35rem] md:h-[35rem] lg:h-[40rem] p-5 rounded-lg bg-myColor-secondary flex justify-center items-center">
        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          <div>
            <div className="w-[20rem] sm:w-[25rem] h-[5rem] flex justify-center items-center bg-myColor-light rounded-lg">
              <p>Student ID: {id}</p>
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default AssessmentsLayout;
