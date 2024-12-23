
import {fetchInstructorProfile} from "../controllers/fetchInstructorProfile.js";
import { fetchStudentDetails } from "../controllers/fetchStudentProfile.js";
import { verifyToken } from "./verifyToken.js";
import Users from '../models/userModel.js';





export const fetchprofileNavigator = async (req, res) => {
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
       
        
        let role =  user.role;
    
        if(role == "Instructor")
        {
            
            return fetchInstructorProfile(req, res,uuid);
        }
        else{
            return fetchStudentDetails(req,res,uuid);
        }
        
    }
    catch(error){  
    console.log(error);
    res.status(500).json({
        error:true,
      success: false,
      message:error,
    });}
};