import React, { useState } from "react";
import { MdEdit, MdSave } from "react-icons/md";
import { styles } from "../../../styles";
import { useLocation, useNavigate } from "react-router-dom";

const SingleUserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const user = location.state?.user; // Safely access user from state

  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  if (!user) {
    return <p>User data is unavailable.</p>; // Handle case where user is undefined
  }

  const handleEditClick = (field) => {
    setEditingField(field);
    setEditedValue(user[field] || ""); // Set the edited value to current user data
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleSave = (field) => {
    // Add your save logic here (e.g., API call to update user data)
    user[field] = editedValue; // Update the user object temporarily
    setEditingField(null); // Exit edit mode
    console.log(`Saved ${field}: ${editedValue}`);
  };

  const userDetails = [
    { label: "User ID", value: user._id, field: "_id" },
    { label: "Username", value: user.username || "N/A", field: "username" },
    { label: "Email", value: user.email || "N/A", field: "email" },
    { label: "Role", value: user.role || "N/A", field: "role" },
    // Add more fields as needed
  ];

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-6">
      <div className="relative flex justify-between items-center mb-4">
        <div className="flex justify-start items-center">
          <h2 className={`${styles.montserratRegular} text-xl text-primary`}>
            Users <span className={`${styles.montserratBold} text-xl text-primary`}>/ {user.username}</span>
          </h2>
          
        </div>
        <div>
          
        </div>
      </div>

      <div className="w-full h-[84vh] flex flex-row justify-center items-start gap-5 rounded-lg">
        {/* Left Section */}
        <div className="w-[30%] h-full flex flex-col gap-5 rounded-lg">
          {/* User Avatar Section */}
          <div className="w-full h-[30%] flex justify-center items-center rounded-lg bg-white relative shadow-md">
            <div className="w-[150px] h-[150px] flex justify-center items-center border-[3px] border-black rounded-full cursor-pointer bg-white">
              <span className="text-3xl text-black">{user.username[0]}</span>
            </div>
            <button
              className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
              onClick={() => handleEditClick("avatar")} // Placeholder for avatar edit
            >
              <MdEdit className="w-4 h-4" />
            </button>
          </div>

          {/* User Details Section */}
          <div
            id="user-details"
            className="w-full h-[70%] flex flex-col justify-start items-start rounded-lg p-4 bg-white shadow-md"
          >
            <div className="w-full text-black space-y-4">
              {userDetails.map(({ label, value, field }, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between rounded-lg border-[1px] border-transparent p-1 hover:border-myColor-extraLight cursor-pointer"
                >
                  <div className="flex flex-col w-[85%]">
                    <label className={`${styles.montserratLight} text-myColor-dark`}>
                      {label}:
                    </label>
                    {editingField === field ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editedValue}
                          onChange={handleInputChange}
                          className="border-b-2 border-gray-300 bg-white focus:border-myColor-dark outline-none text-black mr-2"
                        />
                        <button
                          onClick={() => handleSave(field)}
                          className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"
                        >
                          <MdSave className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className={`${styles.montserratMedium} text-black`}>
                        {value}
                        <button
                          className="ml-2 text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditClick(field)}
                        >
                          <MdEdit className="w-4 h-4 inline" />
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-[70%] h-full bg-white rounded-lg p-6 flex flex-col items-start shadow-md">
          {/* Add any additional details or components for the right section here */}
        </div>
      </div>
    </div>
  );
};

export default SingleUserDetails;
