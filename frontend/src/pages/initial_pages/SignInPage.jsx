import  { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import summaryApi from "../../common";
import Context from "../../context";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const signInData = { email, password };

    try {
      const response = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setIncorrectEmail(false);
        setIncorrectPassword(false);
        navigate('/');
        fetchUserDetails();
        console.log("navigated to home");
      }

      if (dataResponse.error) {
        if ("User not found" == dataResponse.message) {
          setIncorrectEmail(true);
        } else {
          setIncorrectEmail(false);
        }
        if ("Password is incorrect!" == dataResponse.message) {
          setIncorrectPassword(true);
        } else {
          setIncorrectPassword(false);
        }
      }

      if (response.ok) {
        console.log("User signed in successfully:", dataResponse);
        // You can redirect to a different page or show a success message here
      } else {
        console.error("Error during signup:", dataResponse);
        // Handle error, show message to user
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // const functionName = (email) => {
  //   console.log(email);
  // };

  return (
    <section className="min-h-screen w-[100vw] flex items-center justify-center bg-gradient-to-r from-myColor-dark to-myColor-secondary p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-[500px] md:h-auto overflow-y-auto custom-scrollbar md:max-w-lg">
        <motion.div
          key="signIn"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className={`flex flex-col`}
        >
          {/* SignIn Form */}
          <div className={`flex flex-row justify-around items-center  h-[4rem] mb-5`}>
            <button className={`h-[80%] w-[40%] rounded-lg `}>
              Student
            </button>
            <div className={`h-[50%] w-[0.5%] bg-bg-secondary`}></div>
            <button className={`h-[80%] w-[40%] rounded-lg `}>
              Instructor
            </button>

          </div>
          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="email"
                  className={`${styles.montserratMedium} text-sm text-myColor-dark`}
                >
                  Email Address
                </label>
                {incorrectEmail ? (
                  <label
                    htmlFor="email"
                    className={`${styles.montserratMedium} text-sm text-red-600`}
                  >
                    Incorrect e-mail!
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center border-2 border-myColor-light rounded-md p-2 mt-2 focus-within:border-myColor-primary">
                <FaEnvelope className="text-myColor-primary m-2" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // functionName(e.target.value);
                  }}
                  required
                  className="w-full p-2 focus:outline-none bg-transparent focus-visible:bg-transparent focus-visible:border-myColor-primary placeholder-opacity-50"
                  placeholder="Enter your email"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className={`${styles.montserratMedium} text-sm text-myColor-dark`}
                >
                  Password
                </label>
                {incorrectPassword ? (
                  <label
                    htmlFor="password"
                    className={`${styles.montserratMedium} text-sm text-red-600`}
                  >
                    Incorrect password!
                  </label>
                ) : (
                  ""
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
                      className="text-lg text-myColor-primary m-2 cursor-pointer"
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
            </div>

            {/* SignIn Button */}
            <div>
              <button
                type="submit"
                className={`${styles.montserratRegular} w-full bg-myColor-primary text-white py-2 px-4 rounded-md hover:bg-myColor-secondary transition-all duration-300`}
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="text-center mt-6">
            <Link
              to="/forgot-password"
              className={`${styles.montserratRegular} text-myColor-primary hover:text-myColor-secondary`}
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-center mt-2">
            <span className={`${styles.montserratRegular} text-gray-600`}>
              Don't have an account?{" "}
            </span>
            <Link
              to="/sign-up"
              className="text-myColor-primary hover:text-myColor-secondary"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignInPage;
