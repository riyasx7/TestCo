const backendDomain = "http://localhost:8080";

const summaryApi = {
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

  codeTestEvaluator: {
    url: `${backendDomain}/api/code-test-evaluation`,
    method: "POST",
  }
};

export default summaryApi;
