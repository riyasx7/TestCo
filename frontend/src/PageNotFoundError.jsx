import React from "react";
import ghostImage from "./assets/ghostImage.png";

const PageNotFoundError = () => {
  return (
    <div className="w-[100vw] h-[100vh] font-sans bg-yellow-500 min-h-screen flex flex-col justify-between items-center text-gray-800">
      {/* Header Section */}
      <header className="w-full flex justify-between items-center px-8 py-4">
        <a href="/" className="text-lg font-bold">
          TestCo
        </a>
        <nav className="flex space-x-8">
          <a href="/" className="hover:underline">
            Home
          </a>
          {/* <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a> */}
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left space-y-6 lg:space-y-0 lg:space-x-10 py-16 px-8">
  <div className="w-full lg:w-[30vw] h-[50vh] flex flex-col gap-6 bg-slate-600 rounded-lg p-8 shadow-xl">
    <span className="text-xl font-semibold text-white">Error 404</span>
    <h1 className="text-5xl lg:text-6xl font-bold text-white">Hey Buddy</h1>
    <p className="text-lg text-white opacity-80">
      We can't seem to find the page you are looking for.
    </p>
    <a
      href="/"
      className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition-all duration-300 hover:shadow-xl hover:bg-gray-700"
    >
      Go Home
    </a>
  </div>
  <div className="w-full lg:w-[30vw] h-[50vh] bg-gray-500 rounded-lg flex items-center justify-center shadow-xl">
    <img
      src={ghostImage}
      alt="Ghost"
      className="w-40 animate-float transform hover:scale-110 transition-all duration-300"
    />
  </div>
</main>


      {/* Footer Section */}
      <footer className="text-sm py-4">
        <span>(554) 987-654</span> | <span>info@company.com</span>
      </footer>
    </div>
  );
};

export default PageNotFoundError;
