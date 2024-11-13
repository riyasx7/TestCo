import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { GrSearch } from "react-icons/gr";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { setUserDetails, clearUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.data?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user?.data?.role]); // Only run this effect if the user's role changes

  const toggleMenu = () => {
    if (user?.data) {
      setMenuVisible((prev) => !prev);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch(summaryApi.signOut.url, {
        method: summaryApi.signOut.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      const dataResponse = await response.json();
      console.log("Signout check", dataResponse.message);
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        dispatch(clearUserDetails());
        setMenuVisible(false); // Hide menu after signing out
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 w-[100vw] shadow-md">
      <div className="h-full w-full container flex justify-between items-center px-4 mx-auto">
        <div>
          <Link to={"/"}>
            <p className={`${styles.montserratExtraBold} text-myColor-primary`}>
              Dropper
            </p>
          </Link>
        </div>

        <div className="flex items-center w-full h-8 justify-between max-w-sm border-[1px] border-myColor-light rounded-lg pl-2 hover:shadow-sm">
          <input
            type="text"
            placeholder="search product here.."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent focus:border-transparent focus:outline-none"
          />
          <div
            className={`text-[20px] text-white min-w-10 h-8 flex justify-center items-center rounded-r-lg  
              ${
                inputValue
                  ? "bg-myColor-primary border-[1px] border-myColor-primary hover:cursor-pointer"
                  : "bg-myColor-light"
              }`}
          >
            <GrSearch />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-auto gap-5">
          {user?.data ? (
            <div className="text-black">
              <p className="text-myColor-primary">
                Hello, <span className="text-black">{user.data.username}</span>
              </p>
            </div>
          ) : (
            <>
              <div>
                <Link to={"/sign-in"}>
                  <button
                    className={`${styles.montserratMedium} text-white bg-myColor-primary border-1 border-myColor-primary rounded-md p-1 w-20`}
                  >
                    Sign In
                  </button>
                </Link>
              </div>
              <div>
                <Link to={"/sign-up"}>
                  <button
                    className={`${styles.montserratMedium} text-myColor-primary border-2 border-myColor-primary rounded-md p-1 w-20`}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </>
          )}

          <div className="relative">
            <div
              className="text-[18px] flex justify-center items-center w-8 h-8 max-w-sm border-[1px] border-black rounded-full cursor-pointer"
              onClick={toggleMenu}
            >
              <FaUser />
            </div>

            {menuVisible && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
              >
                <ul className="list-none p-2">
                  <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                    <Link to={"/account"}>
                      <p>Account</p>
                    </Link>
                  </li>

                  {isAdmin && (
                    <li className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                      <Link to={"/admin-panel"}>
                        <p>Admin Panel</p>
                      </Link>
                    </li>
                  )}

                  {user?.data && (
                    <li
                      className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="relative text-[25px] flex justify-center items-center w-8 h-8 max-w-sm cursor-pointer">
            <span>
              <FaShoppingCart />
            </span>
            <div className="absolute -top-1 -right-2 bg-myColor-primary text-white w-5 h-5 p-1 flex items-center justify-center rounded-full">
              <p className="text-sm">0</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
