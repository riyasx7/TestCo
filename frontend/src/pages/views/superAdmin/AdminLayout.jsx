import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { styles } from "../../../styles.js";

const InstructorLayout = () => {

  const [activeItem, setActiveItem] = useState("home");
  return (
    <section className="w-full h-[100vh] flex">
      <aside className="w-[15vw] flex flex-col items-center bg-myColor-dark shadow-myColor-medium shadow-lg">
        <div className="w-full h-20 flex flex-col justify-center items-center border-b border-b-myColor-medium ">
          <p className="text-myColor-medium text-2xl">TestCo</p>
        </div>

        {/* Navigation Menu */}
        <div className="mt-5 w-full">
          <nav className="flex flex-col justify-center items-center gap-2">
            <Link to="/instructor/home">
              <div
                className={`cursor-pointer w-[12rem] h-[3rem] flex pl-5 items-center rounded-lg text-myColor-medium hover:text-myColor-light  bg-myColor-primary hover:bg-myColor-secondary  transition duration-200 ease-in-out text-center ${
                  activeItem === "home" ? "bg-myColor-extraLight" : ""
                }`}
                onClick={() => setActiveItem("home")} // Set active item on click
              >
                <p
                  className={`${styles.montserratRegular} text-md text-left`}
                >
                  Home
                </p>
              </div>
            </Link>

            <Link to="/instructor/students-details">
              <div
                className={`cursor-pointer w-[12rem] h-[3rem] flex pl-5 items-center rounded-lg   text-myColor-medium hover:text-myColor-light  bg-myColor-primary hover:bg-myColor-secondary transition duration-200 ease-in-out text-center ${
                  activeItem === "mystudents" ? "bg-myColor-extraLight" : ""
                }`}
                onClick={() => setActiveItem("mystudents")} // Set active item on click
              >
                <p
                  className={`${styles.montserratRegular} text-md text-left`}
                >
                  My Students
                </p>
              </div>
            </Link>

            <Link to="/instructor/assessments">
              <div
                className={`cursor-pointer w-[12rem] h-[3rem] flex pl-5 items-center rounded-lg  text-myColor-medium hover:text-myColor-light  bg-myColor-primary hover:bg-myColor-secondary transition duration-200 ease-in-out text-center ${
                  activeItem === "assessments`" ? "bg-myColor-extraLight" : ""
                }`}
                onClick={() => setActiveItem("assessments")} // Set active item on click
              >
                <p
                  className={`${styles.montserratRegular} text-md text-left`}
                >
                  Assessments
                </p>
              </div>
            </Link>

            <Link to="/instructor/settings">
              <div
                className={`cursor-pointer w-[12rem] h-[3rem] flex pl-5 items-center rounded-lg  text-myColor-medium hover:text-myColor-light  bg-myColor-primary hover:bg-myColor-secondary transition duration-200 ease-in-out text-center ${
                  activeItem === "myaccount`" ? "bg-myColor-extraLight" : ""
                }`}
                onClick={() => setActiveItem("settings")} // Set active item on click
              >
                <p
                  className={`${styles.montserratRegular} text-md text-left`}
                >
                  Settings
                </p>
              </div>
            </Link>

            <Link to="/instructor/myaccount">
              <div
                className={`cursor-pointer w-[12rem] h-[3rem] flex pl-5 items-center rounded-lg  text-myColor-medium hover:text-myColor-light  bg-myColor-primary hover:bg-myColor-secondary transition duration-200 ease-in-out text-center ${
                  activeItem === "myaccount`" ? "bg-myColor-extraLight" : ""
                }`}
                onClick={() => setActiveItem("myaccount")} // Set active item on click
              >
                <p
                  className={`${styles.montserratRegular} text-md text-left`}
                >
                  My Account
                </p>
              </div>
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-[85vw] p-4 bg-myColor-primary">
        <Outlet />
      </main>
    </section>
  );
};

export default InstructorLayout;
