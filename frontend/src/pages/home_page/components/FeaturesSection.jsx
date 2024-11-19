import React from "react";

const FeaturesSection = () => {
  return (
    <motion.div
      className="py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-3xl font-semibold text-center mb-6">
        Why Choose <span className="text-myColor-accent">Testco?</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {["AI Powered", "Data Driven", "User Friendly"].map((feature) => (
          <motion.div
            key={feature}
            className="bg-myColor-secondary p-6 rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-xl font-bold mb-4">{feature}</h4>
            <p className="text-myColor-medium">Description of {feature}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
