import React, { useState, useEffect } from "react";
import backendApi from "../../../backendAPI";
import { toast } from "react-toastify";
import { styles } from "../../../styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SiteUsersDetails = () => {
  const [siteUsers, setSiteUsers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const fetchSiteUsersDetails = async () => {
    try {
      const response = await fetch(backendApi.siteUsersDetails.url, {
        method: backendApi.siteUsersDetails.method,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setSiteUsers(dataResponse.data || []);
      console.log("Fetched data:", dataResponse); // Debugging line
    } catch (error) {
      toast.error("Failed to fetch site users details.");
      console.error("Error fetching site users details: ", error);
    }
  };

  useEffect(() => {
    fetchSiteUsersDetails();
  }, []);

  const handleRowClick = (user) => {
    navigate(`/admin-panel/site-users-details/${user._id}`, { state: { user } });
  };

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4 fix">
        <div className="flex justify-start items-center">
          <h2 className={`${styles.montserratRegular} text-xl text-primary`}>
            Users
          </h2>
        </div>
      </div>

      {siteUsers.length === 0 ? (
        <p className="text-center italic text-white">No user details available.</p>
      ) : (
        <div className="overflow-y-auto max-h-[650px] scrollbar-hide border-[0px] rounded-lg">
          <table className="min-w-full bg-white border border-myColor-extraLight shadow-md rounded-lg">
            <thead className="bg-myColor-extraLight">
              <tr className="sticky top-0 z-10">
                <th className="py-3 px-5 border-b bg-myColor-extraLight border-myColor-extraLight text-left text-gray-700">
                  Serial No.
                </th>
                <th className="py-3 px-5 border-b bg-myColor-extraLight border-myColor-extraLight text-left text-gray-700">
                  User ID
                </th>
                <th className="py-3 px-5 border-b bg-myColor-extraLight border-myColor-extraLight text-left text-gray-700">
                  Name
                </th>
                <th className="py-3 px-5 border-b bg-myColor-extraLight border-myColor-extraLight text-left text-gray-700">
                  Email
                </th>
                <th className="py-3 px-5 border-b bg-myColor-extraLight border-myColor-extraLight text-left text-gray-700">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {siteUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(user)} // Pass the entire user object
                >
                  <td className="py-3 px-5 border-b border-myColor-extraLight">
                    {index + 1}
                  </td>
                  <td className="py-3 px-5 border-b border-myColor-extraLight">
                    {user._id}
                  </td>
                  <td className="py-3 px-5 border-b border-myColor-extraLight">
                    {user.username || "N/A"}
                  </td>
                  <td className="py-3 px-5 border-b border-myColor-extraLight">
                    {user.email || "N/A"}
                  </td>
                  <td className="py-3 px-5 border-b border-myColor-extraLight">
                    {user.role || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SiteUsersDetails;
