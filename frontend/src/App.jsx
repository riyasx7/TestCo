import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"; // Include useState for loading
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice.js";

import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInPage from "./pages/initial_pages/SignInPage.jsx"
import SignUpPage from "./pages/initial_pages/SignUpPage.jsx";
import ForgotPasswordPage from "./pages/initial_pages/ForgetPasswordPage.jsx";
import Home from "./pages/home_page/Home.jsx";
import AdminPanel from "./pages/administrator_pages/AdminPanel.jsx";
import SiteUsersDetails from "./pages/administrator_pages/user_management/SiteUsersDetails.jsx";
import SingleUserDetails from "./pages/administrator_pages/user_management/SingleUserDetails.jsx";
import summaryApi from "./common/index.js";
import Context from "./context/index.js";
import CodeTest from "./pages/code_test_pages/CodeTest.jsx";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [loading, setLoading] = useState(false); // State for loading

  const fetchUserDetails = async () => {
    setLoading(true); // Set loading true
    try {
      const response = await fetch(summaryApi.currentUser.url, {
        method: summaryApi.currentUser.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      console.log("user_data_current: ", dataResponse);

      dispatch(setUserDetails(dataResponse));
    } catch (error) {
      toast.error("Failed to fetch user details."); // Notify error
      console.error("Error fetching user details: ", error);
    } finally {
      setLoading(false); // Set loading false
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated, dispatch]); // Include dispatch in dependencies

  const location = useLocation();
  const hideHeaderFooterRoutes = ["/sign-in", "/sign-up", "/forgot-password", "/code-test"];

  const shouldHideHeaderFooter =
    hideHeaderFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/admin-panel");

  return (
    <div className="min-h-screen">
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        {!shouldHideHeaderFooter && <Header />}
        <main>
          {loading && <p>Loading...</p>} {/* Show loading text */}
          <Routes>
            <Route path={"/code-test"} element={<CodeTest />} />
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/admin-panel" element={<AdminPanel />} >
              <Route path="site-users-details" element={<SiteUsersDetails />} />
              <Route path="site-users-details/:userId" element={<SingleUserDetails />} />
              {/*<Route path="site-products-details" element={<SiteProductsDetails />} />*/}
              {/*<Route path="site-products-details/upload-new-product" element={<UploadProduct />} />*/}
            </Route>
          </Routes>
        </main>
        {!shouldHideHeaderFooter && <Footer />}
      </Context.Provider>
    </div>
  );
}

export default App;
