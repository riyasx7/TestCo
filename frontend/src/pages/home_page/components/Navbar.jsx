// import React, { useEffect, useState } from "react";
// import { HashLink as Link } from "react-router-hash-link"; // Import HashLink for smooth scrolling
// import { motion } from "framer-motion";
// import { styles } from "../styles";
// import { fadeIn } from "../utils/motion";
// import { navLinks } from "../constants";
// import { logo, menu, close } from "../assets";

// const Navbar = () => {
//   const [active, setActive] = useState("Home"); // Default set to 'Home'
//   const [toggle, setToggle] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       if (scrollTop > 100) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // IntersectionObserver to detect the current section in view
//   useEffect(() => {
//     const sections = document.querySelectorAll("section");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.id;
//             setActive(id.charAt(0).toUpperCase() + id.slice(1)); // Capitalize the first letter of the section id
//           }
//         });
//       },
//       { threshold: 0.7 } // Trigger when 70% of the section is visible
//     );

//     sections.forEach((section) => {
//       observer.observe(section);
//     });

//     return () => {
//       sections.forEach((section) => {
//         observer.unobserve(section);
//       });
//     };
//   }, []);

//   return (
//     <nav
//       className={`${
//         styles.paddingX
//       } w-full flex items-center py-5 fixed top-0 z-20 ${
//         scrolled ? "bg-black bg-opacity-50" : "bg-transparent"
//       }`}  // Apply transparent background or slightly darken on scroll
//     >
//       <div className="w-full flex flex-col justify-between items-center max-w-7xl mx-auto">
//         <Link
//           smooth
//           to="/#home" // Hash link to home with smooth scrolling
//           className="flex-col items-center gap-2"
//           onClick={() => {
//             setActive("Home"); // Ensure 'Home' is active when logo is clicked
//             window.scrollTo(0, 0); // Scroll to the top on logo click
//           }}
//         >
//           {/* Add your logo or brand here */}
//         </Link>

//         <motion.ul
//           variants={fadeIn("center", "", 0.5, 1)}
//           initial="hidden"
//           animate="show"
//           className="list-none hidden sm:flex flex-row gap-10"
//         >
//           {navLinks.map((nav) => (
//             <li
//               key={nav.id}
//               className={`${
//                 active === nav.title ? "text-white" : "text-cyan-400"
//               } hover:text-white text-[18px] font-medium cursor-pointer`}
//               onClick={() => {
//                 setActive(nav.title);
//               }}
//             >
//               <Link smooth to={`/#${nav.id}`}>
//                 {nav.title}
//               </Link>
//             </li>
//           ))}
//         </motion.ul>

//         <div className="sm:hidden flex flex-1 justify-end items-center">
//           <img
//             src={toggle ? close : menu}
//             alt="menu"
//             className="w-[28px] h-[28px] object-contain"
//             onClick={() => setToggle(!toggle)}
//           />

//           <div
//             className={`${
//               !toggle ? "hidden" : "flex"
//             } p-6 bg-black bg-opacity-75 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`} // Set transparent black background for mobile menu
//           >
//             <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
//               {navLinks.map((nav) => (
//                 <li
//                   key={nav.id}
//                   className={`font-poppins font-medium cursor-pointer text-[16px] ${
//                     active === nav.title ? "text-white" : "text-cyan-400"
//                   }`}
//                   onClick={() => {
//                     setActive(nav.title);
//                     setToggle(!toggle);
//                   }}
//                 >
//                   <Link smooth to={`/#${nav.id}`}>
//                     {nav.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react'

const Navbar = () => {
  return (
    <div>
      
    </div>
  )
}

export default Navbar
