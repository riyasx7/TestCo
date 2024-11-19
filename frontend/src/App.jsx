import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setUserDetails } from "./store/userSlice.js";
import Context, { AppProvider } from "./context/index.jsx";

import HomePage from "./pages/home_page/HomePage.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInPage from "./pages/initial_pages/SignInPage.jsx";
import SignUpPage from "./pages/initial_pages/SignUpPage.jsx";
import ForgotPasswordPage from "./pages/initial_pages/ForgetPasswordPage.jsx";
import CodingAssessment from "./pages/views/student/assessment-pages/CodingAssessment.jsx";
import InstructorLayout from "./pages/views/instructor/InstructorLayout.jsx";
import StudentsDetails from "./pages/views/instructor/students-details/StudentsDetails.jsx";
import Home from "./pages/views/instructor/home/Home.jsx";
import AssessmentsLayout from "./pages/views/instructor/assessments/AssessmentsLayout.jsx";
import SingleStudentDetails from "./pages/views/instructor/students-details/SingleStudentDetails.jsx";
import AddNewAssement from "./pages/views/instructor/assessments/add-assessments/AddNewAssessment.jsx";
import AssessmentsType from "./pages/views/instructor/assessments/AssessmentsType.jsx";
import MCQAssessment from "./pages/views/student/assessment-pages/MCQAssessment.jsx";
import PageNotFoundError from "./PageNotFoundError.jsx";


const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("/api/current-user", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch user details.");

      const data = await response.json();
      dispatch(setUserDetails(data));
    } catch (error) {
      toast.error("Failed to fetch user details.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchUserDetails();
  }, [isAuthenticated]);

  const location = useLocation();
  const hideHeaderFooterRoutes = ["*"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <AppProvider>
      <ToastContainer />
      {/* {!shouldHideHeaderFooter && <Header />} */}
      <main>
        <Routes>
          <Route path="/" element={<PageNotFoundError/>}/>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/code-test" element={<CodingAssessment />} />
          <Route path="/mcq-assessment" element={<MCQAssessment/>} />

          {/* Instructor Layout and Subroutes */}
          <Route path="/instructor" element={<InstructorLayout />}>
            <Route path="/instructor/home" element={<Home />} />

            {/* Assessment Layout */}
            <Route
              path="/instructor/assessments"
              element={<AssessmentsLayout />}
            />
            <Route
              path="/instructor/assessments/add-new-assessment"
              element={<AddNewAssement />}
            >
              <Route
              path="/instructor/assessments/add-new-assessment/:assessmentType"
              element={<AssessmentsType />}
            />
            </Route>
            

            {/* Student Details Layout */}
            <Route
              path="/instructor/students-details"
              element={<StudentsDetails />}
            />
            <Route
              path="/instructor/students-details/student"
              element={<SingleStudentDetails />}
            />
          </Route>
        </Routes>
      </main>
      {/* {!shouldHideHeaderFooter && <Footer />} */}
    </AppProvider>
  );
};

export default App;
