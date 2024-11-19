import React, { useState } from "react";
import Navbar from "./components/Navbar";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`w-[100vw] h-[100vh]`}>
      <div className="bg-myColor-primary text-white p-8">
        <Navbar/>
        
       
      </div>
    </div>
  );
};

export default HomePage;
