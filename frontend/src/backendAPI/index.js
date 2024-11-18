const backendDomain = "http://localhost:8080";

const backendApi = {
  signUp: {
    url: `${backendDomain}/api/sign-up`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/sign-in`,
    method: "POST",
  },
  currentUser: {
    url: `${backendDomain}/api/user-Details`,
    method: "GET",
  },
  signOut: {
    url: `${backendDomain}/api/sign-out`,
    method: "GET",
  },
  siteUsersDetails: {
    url: `${backendDomain}/api/site-users-details`,
    method: "GET",
  },
  updateUserDetails: {
    url: `${backendDomain}/api/update-User-Details`,
    method: "POST",
  },
  UploadProduct: {
    url: `${backendDomain}/api/upload-new-product`,
    method: "POST",
  },
  siteProductsDetails: {
    url: `${backendDomain}/api/site-products-details`,
    method: "GET",
  },

  
  // INSTRUCTOR SIDE
  createCodingAssessment: {
    url: `${backendDomain}/api/create-coding-assessment`,
    method: "POST",
  },

  codingAssessmentDataPull: {
    url: `${backendDomain}/api/coding-assessment-data-pull`,
    method: "GET",
  },

  // STUDENT SIDE
  codingAssessmentEvaluation: {
    url: `${backendDomain}/api/coding-assessment-evaluation`,
    method: "POST",
  },
};

export default backendApi;
