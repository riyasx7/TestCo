import express from "express";
import {signup,login,logout} from "../controllers/auth.js";
import { createprofileNavigator } from "../middleware/createprofileNavigator.js";
import{createAssessment} from"../controllers/createAssessment.js"
import { createStudents } from "../controllers/createStudents.js";
import { fetchprofileNavigator } from "../middleware/fetchProfileNavigator.js";

import { fetchCourseStudents } from "../controllers/fetchCourseStudents.js";
const router = express.Router();

router.post("/api/sign-in",login);
router.post("/api/sign-out",logout);
router.post("/api/profile-completion",createprofileNavigator)
router.post("/api/fetch-profile",fetchprofileNavigator)
router.post("/api/addStudents",createStudents)
router.post("/create-assesment",createAssessment)
router.post("/api/fetch-student-details",fetchCourseStudents);

export default router;