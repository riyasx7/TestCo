const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB() {
  try {
    // Use correct environment variable name (MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;
