import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { styles } from "../../../styles.js";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion.js";

const InstructorLayout = () => {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <section className="w-[100vw] h-[100vh] flex md:flex-row">
      {/* Sidebar */}
      <aside className="w-full h-[100vh] sm:w-[25vw] md:w-[20vw] lg:w-[15vw] flex flex-col items-center bg-myColor-dark shadow-myColor-medium shadow-lg">
        {/* Header */}
        <div className="w-full h-20 flex justify-center items-center border-b border-b-myColor-medium">
          <p className="text-myColor-medium text-xl md:text-2xl">TestCo</p>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-5 w-full flex flex-col items-center gap-2">
          {["Home", "My Students", "Assessments", "Settings", "My Account"].map(
            (item) => (
              <Link
                to={`/instructor/${item === "home" ? "" : item}`}
                key={item}
              >
                <motion.div
                  variants={fadeIn("center", "", 0.5, 0.25)}
                  initial="hidden"
                  animate="show"
                  whileTap={{scale: 0.95}}
                  whileHover={{scale: 1.025}}
                  transition={{
                    duration: 0.02,  
                    ease: "easeInOut", 
                  }}
                  className={`cursor-pointer w-[90%] sm:w-[9rem] md:w-[9rem] lg:w-[12rem] h-[3rem] flex pl-5 items-center rounded-lg text-myColor-medium hover:text-myColor-light bg-myColor-primary hover:bg-myColor-secondary transition duration-200 ease-in-out text-center ${
                    activeItem === item ? "bg-myColor-extraLight" : ""
                  }`}
                  onClick={() => setActiveItem(item)}
                >
                  <p
                    className={`${styles.montserratRegular} text-sm md:text-md text-left`}
                  >
                    {item}
                  </p>
                </motion.div>
              </Link>
            )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full sm:w-[75vw] md:w-[80vw] lg:w-[85vw] p-4 bg-myColor-primary">
        <Outlet />
      </main>
    </section>
  );
};

export default InstructorLayout;
