import { useEffect, useRef, useState } from "react";
import Typed from "typed.js"; // Import Typed.js
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { styles } from "../../styles";
import { motion } from "framer-motion"; // Import necessary framer-motion components
import backendApi from "../../backendAPI";
import Context from "../../context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { fadeIn } from "../../utils/motion"; // Ensure the fadeIn motion is defined correctly

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);``
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const typedRef = useRef(null); // Create a reference for the element

  useEffect(() => {
    // Initialize Typed.js once the component mounts
    const typed = new Typed(typedRef.current, {
      strings: ["Welcome back!"], // Define the text to type
      typeSpeed: 100, // Speed of typing
      backSpeed: 50, // Speed of backspacing
      backDelay: 1000, // Delay before backspacing starts
      startDelay: 500, // Delay before typing starts
      loop: false, // No loop for this case
    });

    // Clean up Typed.js instance on unmount
    return () => {
      typed.destroy();
    };
  }, []);

  // Regex for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!emailRegex.test(email)) {
      setIncorrectEmail(true);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setIncorrectPassword(true);
      return;
    }

    setIsLoading(true); // Start loading state
    const signInData = {
      email,
      password,
    };

    try {
      const response = await fetch(backendApi.signIn.url, {
        method: backendApi.signIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      const dataResponse = await response.json();
      console.log(dataResponse)
      if (dataResponse.success) {
        setIncorrectEmail(false);
        setIncorrectPassword(false);
        navigate("/");
        fetchUserDetails();
        console.log("navigated to home");
      }

      // Centralized error handling
      if (dataResponse.error) {
        if (dataResponse.message === "User not found") {
          setIncorrectEmail(true);
        } else {
          setIncorrectEmail(false);
        }
        if (dataResponse.message === "Password is incorrect!") {
          setIncorrectPassword(true);
        } else {
          setIncorrectPassword(false);
        }
      }

      if (!response.ok) {
        console.error("Error during sign-in:", dataResponse);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  // Animations for different sections
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <section className="min-h-screen w-[100vw] flex flex-row items-center justify-around bg-gradient-to-r from-myColor-dark to-myColor-secondary p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-[500px] md:h-auto overflow-y-auto custom-scrollbar md:max-w-lg">
        <form onSubmit={handleSignIn} className="space-y-6">
          <motion.h2
            className={`${styles.montserratBold} text-xl text-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span ref={typedRef}></span> {/* Render the typing animation */}
          </motion.h2>

          <div className="flex flex-col gap-5">
            {/* Email Field */}
            <motion.div
              variants={fadeIn("right", "easein", 0.4, 1)}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-row justify-between items-center">
                <label
                  htmlFor="email"
                  className={`${styles.montserratMedium} text-sm text-myColor-dark`}
                >
                  Email Address
                </label>
                {incorrectEmail && (
                  <motion.label
                    htmlFor="email"
                    className={`${styles.montserratMedium} text-sm text-red-600`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    aria-live="assertive"
                  >
                    Incorrect or invalid email!
                  </motion.label>
                )}
              </div>
              <div className="flex items-center border-2 border-myColor-light rounded-md p-2 mt-2 focus-within:border-myColor-primary">
                <FaEnvelope className="text-myColor-primary m-2" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 focus:outline-none bg-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              variants={fadeIn("right", "easein", 1, 1)}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-row justify-between items-center">
                <label
                  htmlFor="password"
                  className={`${styles.montserratMedium} text-sm text-myColor-dark`}
                >
                  Password
                </label>
                {incorrectPassword && (
                  <motion.label
                    htmlFor="password"
                    className={`${styles.montserratMedium} text-sm text-red-600`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    aria-live="assertive"
                  >
                    Incorrect password!
                  </motion.label>
                )}
              </div>

              <div className="flex items-center border-2 border-myColor-light rounded-md p-2 mt-2 focus-within:border-myColor-primary">
                <FaLock className="text-myColor-primary m-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 focus:outline-none bg-transparent"
                  placeholder="Enter your password"
                />
                <span>
                  {showPassword ? (
                    <FaEyeSlash
                      className="text-lg text-myColor-medium m-2 cursor-pointer hover:text-myColor-dark"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="text-lg text-myColor-primary m-2 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </span>
              </div>
            </motion.div>

            {/* Sign In Button */}
            <motion.div
              variants={fadeIn("up", "easein", 1.6, 1)}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="submit"
                className={`${styles.montserratRegular} w-full bg-myColor-primary text-white py-4 px-4 rounded-md hover:bg-myColor-secondary transition-all duration-300 mt-4`}
                disabled={isLoading}
                id="submit-button"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </motion.div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignInPage;
