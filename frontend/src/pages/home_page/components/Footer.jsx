import React from "react";

const Footer = () => {
  return (
    <footer className="bg-myColor-dark text-myColor-light py-8">
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © 2024 Testco. All Rights Reserved.
      </motion.div>
      <div className="flex justify-center gap-4">
        {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
          <motion.a
            key={item}
            href="#"
            className="hover:text-myColor-accent"
            whileHover={{ scale: 1.1 }}
          >
            {item}
          </motion.a>
        ))}
      </div>
      <div className="flex justify-center gap-8 mt-6">
        {["LinkedIn", "Facebook", "Twitter"].map((platform) => (
          <motion.a
            key={platform}
            href="#"
            className="hover:scale-110 transition-all"
            whileHover={{ scale: 1.2 }}
          >
            {platform}
          </motion.a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
