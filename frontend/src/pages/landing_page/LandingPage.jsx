
import { motion } from "framer-motion";  // Importing framer-motion
import Navbar_Landing from "./NavBar_Landing.jsx";
const LandingPage = () => {
    return (
        <div className="bg-[#2B2D42] text-[#cbd5e1] font-sans ">
            {/* Navbar */}
            <Navbar_Landing/>

            {/* Hero Section */}
            <motion.section
                id="home"
                className="flex items-center justify-center min-h-screen bg-[#2B2D42] text-center py-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <div className="text-center">
                    <motion.h2
                        className="text-4xl font-bold text-[#cbd5e1]"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Welcome to TestManage
                    </motion.h2>
                    <motion.p
                        className="text-lg mt-4 text-[#A0AEC0]"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        A smart test management platform to streamline your assessment workflow.
                    </motion.p>
                    <motion.button
                        className="mt-6 px-6 py-3 text-white bg-[#58A4B0] hover:bg-[#1E293B] rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Get Started
                    </motion.button>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                id="features"
                className="py-20 bg-[#2D4059]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <div className="container mx-auto text-center">
                    <motion.h3
                        className="text-3xl font-bold text-[#cbd5e1]"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        Platform Features
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {["Efficient Test Creation", "Real-Time Analytics", "Secure & Scalable"].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#1E293B] p-8 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                    ease: "easeOut",
                                }}
                            >
                                <motion.h4
                                    className="text-xl font-semibold text-[#cbd5e1]"
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    {feature}
                                </motion.h4>
                                <motion.p
                                    className="mt-4 text-[#A0AEC0]"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    {`Description for ${feature}`}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
                className="py-20 bg-[#2B2D42] text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
            >
                <div className="container mx-auto">
                    <motion.h3
                        className="text-3xl font-bold text-[#cbd5e1]"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Start Managing Your Tests Smarter Today
                    </motion.h3>
                    <motion.button
                        className="mt-6 px-6 py-3 text-white bg-[#58A4B0] hover:bg-[#1E293B] rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Get Started
                    </motion.button>
                </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
                className="bg-[#1E293B] py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                <div className="container mx-auto text-center">
                    <p className="text-[#A0AEC0]">© 2024 TestManage. All rights reserved.</p>
                </div>
            </motion.footer>
        </div>
    );
};

export default LandingPage;
