const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index.js");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" })); // Parse JSON bodies with limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.use("/api", router);

const PORT = 8080;

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to DB");
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
    process.exit(1); // Exit process with failure
  });
