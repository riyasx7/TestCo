
import {InstructorProfile} from "../controllers/InstructorProfile.js";
import { StudentProfile } from "../controllers/StudentProfile.js";
import Users from '../models/userModel.js';
import { verifyToken } from "./verifyToken.js";


export const createprofileNavigator = async (req, res) => {
    try{

        
        const { error, data: decodedToken } = verifyToken(req);

        if (error) {
          return res.status(403).json({
            message: error,
            success: false,
            error: true,
          });
        }
        
        const uuid = decodedToken.userID;

        const user = await Users.findById(uuid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        let role =  user.role
     
        if(role == "Instructor")
        {
            
            return InstructorProfile(req, res,uuid);
        }
        else{
            return StudentProfile(req,res,uuid);
        }
        
    }
    catch(error){  
    
    res.status(500).json({
        error:true,
      success: false,
      message: "Failed to process profile",
    });}
};