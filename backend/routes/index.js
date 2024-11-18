const express = require('express');

const router = express.Router();

const userSignUpController = require("../controller/signing/userSignUp");
const userSignInController = require("../controller/signing/userSignIn");
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userSignOutController = require("../controller/signing/userSignOut");
const siteUsersDetails = require('../controller/siteUsersDetails');
// const siteProductsDetails = require('../controller/siteProductsDetails');
const updateUserDetails = require('../controller/updateUserDetails');

// Public routes
router.post("/sign-up", userSignUpController);
router.post("/sign-in", userSignInController);
router.get("/sign-out", userSignOutController);

// Authenticated routes
router.get("/user-Details", authToken, userDetailsController);

// Admin panel - Ensure siteUsersDetails is protected
router.get("/site-users-details", authToken, siteUsersDetails);  
// router.get("/site-products-details", authToken, siteProductsDetails);
// Edits by admin
router.post("/update-User-Details",authToken,updateUserDetails);



//  Instructor side
const createCodingAssessment = require('../controller/instructor-functionalites/assessment-creation/assessmentCreationController');
router.post("/create-coding-assessment",createCodingAssessment)


{/* Student side assesment  */} 

//      data pushing/fetching

const codingAssessmentDataPush = require('../controller/student-functionalities/assessments/assessments-data-push/codingAssessment');
router.get("/coding-assessment-data-pull",codingAssessmentDataPush)

const mcqAssessmentDataPush = require('../controller/student-functionalities/assessments/assessments-data-push/mcqAssessment');
router.get("/mcq-assessment-data-pull",mcqAssessmentDataPush)


//      mcq assessment data receiving and evaluation
const mcqAssessment = require('../controller/student-functionalities/assessments/assessment-evaluation/mcqAssessment');
router.post("/mcq-assessment-evaluation",mcqAssessment)

//      coding assessment evaluation
const codingTestEvaluatorPython = require("../controller/student-functionalities/assessments/assessment-evaluation/codingAssessmentPython");
router.post("/coding-assessment-evaluation",codingTestEvaluatorPython);
module.exports = router;
