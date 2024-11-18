import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaUserAlt,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import backendApi from "../../backendAPI";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEnterPassword, setShowEnterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [emptyFields, setEmptyFields] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset states
    setEmptyFields({
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
    setEmailInvalid(false);
    setPasswordMismatch(false);

    // Check for empty fields
    if (!username || !email || !password || !confirmPassword) {
      setEmptyFields({
        username: !username,
        email: !email,
        password: !password,
        confirmPassword: !confirmPassword,
      });
      return;
    }

    // Check for valid email
    if (!validateEmail(email)) {
      setEmailInvalid(true);
      return;
    }

    // Check for password mismatch
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false);
    }

    // Check password strength
    setPasswordStrength(checkPasswordStrength(password));

    const signupData = { username, email, password, role:"student"};
    console.log("frontend: ", signupData);
    // Sending data to the backend
    try {
      const response = await fetch(backendApi.signUp.url, {
        method: backendApi.signUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        console.log("User signed up successfully:", dataResponse);
        toast.success(dataResponse.message);
        navigate("/sign-in");
      }
      if (dataResponse.error) {
        toast.error(dataResponse.message);
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
    <section className="min-h-screen w-[100vw] flex items-center justify-center bg-gradient-to-r from-myColor-secondary to-myColor-dark p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-[500px] md:h-auto overflow-y-auto custom-scrollbar md:max-w-lg">
        <motion.div
          key="signup"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Signup Form */}
          <h1
            className={`${styles.montserratBold} text-2xl font-bold text-center text-myColor-primary mb-8`}
          >
            Create Your Account
          </h1>
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className={`${styles.montserratMedium} text-sm text-myColor-dark`}
              >
                Username
              </label>
              <div
                className={`flex items-center border-2 rounded-md p-2 mt-2 
                ${
                  emptyFields.username
                    ? "border-orange-500"
                    : "border-myColor-light"
                } 
                focus-within:border-myColor-primary`}
              >
                <FaUserAlt className="text-myColor-primary m-2" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-2 focus:outline-none bg-transparent"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="email"
                  className={`${styles.montserratMedium} text-sm text-myColor-dark`}
                >
                  Email Address
                </label>
                {emptyFields.email && (
                  <label
                    htmlFor="email"
                    className={`${styles.montserratMedium} text-sm text-orange-600`}
                  >
                    Email missing!
                  </label>
                )}
                {emailInvalid && (
                  <label
                    htmlFor="email"
                    className={`${styles.montserratMedium} text-sm text-red-600`}
                  >
                    Invalid email format!
                  </label>
                )}
              </div>
              <div
                className={`flex items-center border-2 rounded-md p-2 mt-2 
                ${
                  emptyFields.email
                    ? "border-orange-500"
                    : "border-myColor-light"
                } 
                focus-within:border-myColor-primary`}
              >
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
                {emptyFields.password && (
                  <label
                    htmlFor="password"
                    className={`${styles.montserratMedium} text-sm text-orange-600`}
                  >
                    Password missing!
                  </label>
                )}
              </div>
              <div
                className={`flex items-center rounded-md p-2 mt-2 
                ${
                  passwordMismatch
                    ? "border-[3px] border-red-600"
                    : emptyFields.password
                    ? "border-orange-500"
                    : "border-2 border-myColor-light"
                }
                focus-within:border-myColor-primary`}
              >
                <FaLock className="text-myColor-primary m-2" />
                <input
                  type={showEnterPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 focus:outline-none bg-transparent"
                  placeholder="Enter your password"
                />
                <span>
                  {showEnterPassword ? (
                    <FaEyeSlash
                      className="text-lg text-myColor-primary m-2 cursor-pointer"
                      onClick={() => setShowEnterPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="text-lg text-myColor-primary m-2 cursor-pointer"
                      onClick={() => setShowEnterPassword(true)}
                    />
                  )}
                </span>
              </div>
              {password && (
                <div className={`text-sm text-myColor-dark`}>
                  Password Strength: <strong>{passwordStrength}</strong>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="flex flex-row justify-between">
                <label
                  htmlFor="confirm-password"
                  className={`${styles.montserratMedium} text-sm text-myColor-dark`}
                >
                  Confirm Password
                </label>

                {emptyFields.confirmPassword && (
                  <label
                    htmlFor="confirm-password"
                    className={`${styles.montserratMedium} text-sm text-orange-600`}
                  >
                    Password missing!
                  </label>
                )}

                {passwordMismatch && (
                  <label
                    htmlFor="confirm-password"
                    className={`${styles.montserratLight} text-sm text-red-600`}
                  >
                    Password does not match!
                  </label>
                )}
              </div>

              <div
                className={`flex items-center border-2 rounded-md p-2 mt-2 
                ${
                  passwordMismatch
                    ? "border-[3px] border-red-600"
                    : emptyFields.confirmPassword
                    ? "border-orange-500"
                    : "border-myColor-light"
                } 
                focus-within:border-myColor-primary`}
              >
                <FaLock className="text-myColor-primary m-2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-2 focus:outline-none bg-transparent"
                  placeholder="Re-enter your password"
                />
                <span>
                  {showConfirmPassword ? (
                    <FaEyeSlash
                      className="text-lg text-myColor-primary m-2 cursor-pointer"
                      onClick={() => setShowConfirmPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="text-lg text-myColor-primary m-2 cursor-pointer"
                      onClick={() => setShowConfirmPassword(true)}
                    />
                  )}
                </span>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-myColor-primary text-white py-2 rounded-md font-semibold mt-4 hover:bg-myColor-primary-dark transition-all"
            >
              Sign Up
            </button>
          </form>

          {/* Already have an account */}
          <p className="text-myColor-dark text-sm text-center mt-6">
            Already have an account?{" "}
            <Link
              to={"/sign-in"}
              className="text-myColor-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUpPage;
