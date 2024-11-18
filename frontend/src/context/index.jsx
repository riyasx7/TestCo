import React, { createContext, useState } from "react";

// Create the Context
const AppContext = createContext();

// Context Provider Component
export const AppProvider = ({ children }) => {
  // Global state variables
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user details from API
  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user-details", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch user details.");

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ userDetails, fetchUserDetails, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
