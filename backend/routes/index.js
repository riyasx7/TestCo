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
const createCodingAssessment = require('../controller/instructor-functionalites/assessment-creation/codingAssessmentCreationController');
router.post("/create-coding-assessment",createCodingAssessment)


// Student side
const codingAssessmentDataPush = require('../controller/student-functionalities/assessments/assessments-data-push/codingAssessment');
router.get("/coding-assessment-data-pull",codingAssessmentDataPush)

//  test evaluator
const codingTestEvaluatorPython = require("../controller/student-functionalities/assessments/assessment-evaluation/codingAssessmentPython");
router.post("/coding-assessment-evaluation",codingTestEvaluatorPython);
module.exports = router;
