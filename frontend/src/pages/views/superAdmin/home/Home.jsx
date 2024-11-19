import React, { useContext, useEffect } from "react";
import { styles } from "../../../../styles.js";
import { LuSearch } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import AppContext from "../../../../context/index.jsx";

const Home = () => {
  const { userDetails, fetchUserDetails, isLoading } = useContext(AppContext);

  // Fetch user details on component mount if not already loaded
  useEffect(() => {
    if (!userDetails) {
      fetchUserDetails();
    }
  }, [userDetails, fetchUserDetails]);

  return (
    <div className="flex flex-col gap-5">
      {/** TOP BAR */}
      <div className="w-full h-[5rem] flex flex-row justify-between items-center p-5 bg-myColor-secondary rounded-lg">
        <h1 className={`${styles.montserratBold} text-lg text-myColor-light`}>
          Home
        </h1>
        <div className="w-[27rem] flex flex-row justify-between items-center ">
          <div className="w-[20rem] h-[2rem] flex flex-row bg-myColor-secondary border border-myColor-medium rounded-lg">
            <div className="w-[3rem] h-full flex justify-center items-center text-2xl font-extrabold rounded-l-lg cursor-pointer text-myColor-medium border-r border-r-myColor-medium">
              <LuSearch />
            </div>
            <input
              className="w-full h-full bg-transparent border-0 outline-none px-2 text-myColor-primary"
              placeholder="Search.."
              type="text"
            />
          </div>
          <div className="w-[2rem] h-[2rem] flex justify-center items-center text-2xl text-myColor-medium cursor-pointer">
            <FaRegBell />
          </div>
          <div className="w-[2rem] h-[2rem] rounded-full bg-black"></div>
        </div>
      </div>

      {/* Rest Content */}
      <div className="w-[100%] h-[40rem] p-5 rounded-lg bg-myColor-light">
        {isLoading ? (
          <p>Loading...</p>
        ) : userDetails ? (
          <div>
            <h2>Welcome, {userDetails.name || "Instructor"}!</h2>
            <p>Role: {userDetails.role || "N/A"}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
