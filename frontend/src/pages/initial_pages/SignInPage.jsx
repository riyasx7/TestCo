import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import backendApi from "../../backendAPI";
import Context from "../../context";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  // const [userType, setUserType] = useState("student");  // Track user type (student or instructor)

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const signInData = {
      email,
      password,
      // role: userType // Dynamically send the selected role (student or instructor)
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

      if (dataResponse.success) {
        setIncorrectEmail(false);
        setIncorrectPassword(false);
        navigate('/');
        fetchUserDetails();
        console.log("navigated to home");
      }

      if (dataResponse.error) {
        if ("User not found" === dataResponse.message) {
          setIncorrectEmail(true);
        } else {
          setIncorrectEmail(false);
        }
        if ("Password is incorrect!" === dataResponse.message) {
          setIncorrectPassword(true);
        } else {
          setIncorrectPassword(false);
        }
      }

      if (response.ok) {
        console.log("User signed in successfully:", dataResponse);
      } else {
        console.error("Error during signup:", dataResponse);
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

  return (
      <section
          className="min-h-screen w-[100vw] flex flex-row items-center justify-around bg-gradient-to-r from-myColor-dark to-myColor-secondary p-6">

          <div
              className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-[500px] md:h-auto overflow-y-auto custom-scrollbar md:max-w-lg">
            <motion.div
                key="signIn"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{duration: 0.3}}
                className={`flex flex-col`}
            >

              <form onSubmit={handleSignIn} className="space-y-6">
                <h2 className="text-xl text-center font-semibold"> Sign In</h2>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className={`${styles.montserratMedium} text-sm text-myColor-dark`}>
                    Email Address
                  </label>
                  {incorrectEmail ? (
                      <label htmlFor="email" className={`${styles.montserratMedium} text-sm text-red-600`}>
                        Incorrect e-mail!
                      </label>
                  ) : ""}
                  <div
                      className="flex items-center border-2 border-myColor-light rounded-md p-2 mt-2 focus-within:border-myColor-primary">
                    <FaEnvelope className="text-myColor-primary m-2"/>
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
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className={`${styles.montserratMedium} text-sm text-myColor-dark`}>
                    Password
                  </label>
                  {incorrectPassword ? (
                      <label htmlFor="password" className={`${styles.montserratMedium} text-sm text-red-600`}>
                        Incorrect password!
                      </label>
                  ) : ""}
                  <div
                      className="flex items-center border-2 border-myColor-light rounded-md p-2 mt-2 focus-within:border-myColor-primary">
                    <FaLock className="text-myColor-primary m-2"/>
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

                {/* Sign In Button */}
                <div>
                  <button
                      type="submit"
                      className={`${styles.montserratRegular} w-full bg-myColor-primary text-white py-2 px-4 rounded-md hover:bg-myColor-secondary transition-all duration-300`}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
      </section>
);
};

export default SignInPage;
