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
//product upload
// router.post("/upload-new-product",uploadProductController);


//test evaluator
const testEvaluator = require("../controller/test_evaluation/codeTest_evaluator_python");
router.post("/code-test-evaluation",testEvaluator);

module.exports = router;
