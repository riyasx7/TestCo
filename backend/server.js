import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import router from "./routes/routes.js";
import connectDB from "./database/db.js";

dotenv.config();
const PORT = process.env.PORT;

const app=express();

app.use((req, res, next) => {
  console.log(`HIT: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware/handler
});

app.use(express.json())
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:5173", 
//     credentials: true, // Allow cookies
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
//   })
// );

  
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // Dynamically set the origin
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    ); // Allowed HTTP methods
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    ); // Allowed headers
    next();
  });



  
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies with limit
 app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/",(req,res)=>{
    res.send('Hello Users!');
})

app.use("/",router);


app.listen(PORT,()=>{
    connectDB();
    console.log(`SERVER  IS RUNNING ON PORT ${PORT}`);
})