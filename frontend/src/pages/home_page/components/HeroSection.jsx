import React from 'react'

const HeroSection = () => {
  return (
    <motion.div
          className="flex flex-col md:flex-row justify-between items-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Building Careers,{" "}
              <span className="text-myColor-accent">Digitizing</span>{" "}
              Assessments
            </h2>
            <p className="text-myColor-medium text-lg mb-6">
              The fastest-growing assessment platform for seamless collaboration.
            </p>
            <div className="flex gap-4">
              <motion.button
                className="bg-myColor-success px-6 py-3 rounded-lg hover:bg-myColor-accent transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="bg-myColor-warning px-6 py-3 rounded-lg hover:bg-myColor-accent transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
          <motion.img
            src="/images/hero-image.png"
            alt="Hero Image"
            className="w-full md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
  )
}

export default HeroSection
