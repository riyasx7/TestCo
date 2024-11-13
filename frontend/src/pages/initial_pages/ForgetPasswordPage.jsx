import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { styles } from "../../styles";
import { motion } from "framer-motion";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset message and error
    setMessage("");
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate sending a reset link
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage(`Password reset link sent to ${email}`);
    }, 2000); // Simulate a 2-second delay for the process
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
          key="forgot-password"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <h1
            className={`${styles.montserratBold} text-2xl font-bold text-center text-myColor-primary mb-8`}
          >
            Reset Password
          </h1>

          {/* Show success message */}
          {message && (
            <p className="text-center text-green-600 mb-4">{message}</p>
          )}

          {/* Show error message */}
          {error && <p className="text-center text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={`${styles.montserratMedium} text-sm text-myColor-dark`}
              >
                Email Address
              </label>
              <div className="flex items-center border-2 border-myColor-light rounded-md p-2 mt-2 focus-within:border-myColor-primary">
                <FaEnvelope className="text-myColor-primary m-2" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                  className="w-full p-2 focus:outline-none bg-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  styles.montserratRegular
                } w-full bg-myColor-primary text-white py-2 px-4 rounded-md hover:bg-myColor-secondary transition-all duration-300 ${
                  loading && "cursor-not-allowed"
                }`}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="text-center mt-6">
            <Link
              to="/sign-in"
              className={`${styles.montserratRegular} text-myColor-primary hover:text-myColor-secondary`}
            >
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
