import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const signup=async(req,res)=>{
    try{
    const {userName,email,password,role} = req.body;
    
    const user=await User.findOne({userName});
    if(user){
        return res.status(400).json({error:'User already exist'});
    }

    //Hash password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);


    let profilepic=''
    //Avatar generator
    profilepic=`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`;
    

    const newUser=new User({
        userName,
        email,
        password:hashPassword,
        role,
        profile:profilepic,
    });

    await newUser.save();
    res.status(200).json({message:'User created successfully'});
}
catch(error){
 res.status(500).json({error:error.message});
}}


export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        const verifyPassword=await bcrypt.compare(password, user?.password || "");
        
        if(!user || !verifyPassword){
            return res.status(400).json({error:"Invalid username or password"});
        }


        const tokenData = {
            userID: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
          };
      
          const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 *24 * 8 , 
          });
      
       
          const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookie in production
            sameSite: "Strict", // Prevents CSRF attacks
            path: "/", // Ensure it's sent on all routes
          };
      
          // Send response with token
          res.cookie("token", token, tokenOption).json({
            message: "Sign in successfully completed!",
            role:user.role,
            email:user.email,
            profileCompleted:user.profileCompleted,
            accessToken:token,
            success: true,
            error: false,
            
          });
        }
        catch(error){
            console.log("Error in login",error.message);
            res.status(500).json({error:"Internal server error"});
        }
    }
    





//logout route
export const logout=(req,res)=>{
    try {
        // Check if the token exists in the cookies
        if (req.cookies.token) {
            // Clear the token cookie
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Secure cookie in production
                sameSite: "Strict", // Prevent CSRF attacks
                path: "/" // Ensure it applies to all routes
            });
        }

        // Send a success response indicating sign-out completion
        res.json({
            message: "Signed out successfully!",
            error: false,
            success: true,
            data: [],
        });
    } catch (err) {
        // Log and handle any errors during the sign-out process
        console.error(err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}