import React, { useState } from "react"; // Import useState
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { styles } from "../../styles";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  // console.log("check: ", user);

  const [activeItem, setActiveItem] = useState(null); // State to track active item

  return (
    <section className="w-full h-[100vh] flex">
      <aside className="w-[15vw] flex flex-col items-center bg-white shadow-lg">
        {/* Admin Welcome Section */}
        <div className="w-full h-24 flex flex-col justify-center items-center bg-myColor-light">
          <p className="text-gray-600 text-sm">
            Welcome,{" "}
            <span className="text-[22px] font-semibold text-myColor-dark">
              Admin!
            </span>
          </p>
        </div>

        {/* Navigation Menu */}
        <div className="mt-5 w-full">
          <nav className="flex flex-col">
            <Link to="/admin-panel/site-products-details">
              <div
                className={`cursor-pointer py-3 px-6 hover:bg-myColor-extraLight hover:text-myColor-dark transition duration-200 ease-in-out text-center ${activeItem === 'products' ? 'bg-myColor-extraLight' : ''}`}
                onClick={() => setActiveItem('products')} // Set active item on click
              >
                <p className={`${styles.montserratRegular} text-lg text-left pl-5 text-gray-700`}>
                  Products
                </p>
              </div>
            </Link>
            <Link to="/admin-panel/site-users-details">
              <div
                className={`cursor-pointer py-3 px-6 hover:bg-myColor-extraLight hover:text-myColor-dark transition duration-200 ease-in-out text-center ${activeItem === 'users' ? 'bg-myColor-extraLight' : ''}`}
                onClick={() => setActiveItem('users')} // Set active item on click
              >
                <p className={`${styles.montserratRegular} text-lg text-left pl-5 text-gray-700`}>
                  Users
                </p>
              </div>
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-[85vw] p-4 bg-gray-100">
        <Outlet />
      </main>
    </section>
  );
};

export default AdminPanel;
