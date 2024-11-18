import { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link"; // Import HashLink for smooth scrolling
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion.js";
// import { menu, close } from "../assets";

const navLinks = [
    {
        id: "home",
        title: "Home",
    },
    {
        id: "about",
        title: "About",
    },
    {
        id: "techSkills",
        title: "TechSkills",
    },
    {
        id: "education",
        title: "Education",
    },

];

const Navbar_Landing = () => {
    const [active, setActive] = useState("Home"); // Default set to 'Home'
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // IntersectionObserver to detect the current section in view
    useEffect(() => {
        const sections = document.querySelectorAll("section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActive(id.charAt(0).toUpperCase() + id.slice(1)); // Capitalize the first letter of the section id
                    }
                });
            },
            { threshold: 0.7 } // Trigger when 70% of the section is visible
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <nav
            className={` w-full flex items-center py-5 fixed top-0 z-20 ${
                scrolled ? "bg-black bg-opacity-50" : "bg-transparent"
            }`}  // Apply transparent background or slightly darken on scroll
        >
            <div className="w-full flex flex-row justify-between items-center max-w-7xl mx-auto bg-green-500">
                <Link
                    smooth
                    to="/#home" // Hash link to home with smooth scrolling
                    className="flex-col items-center gap-2 text-[20px] text-myColor-medium"
                    onClick={() => {
                        setActive("Home"); // Ensure 'Home' is active when logo is clicked
                        window.scrollTo(0, 0); // Scroll to the top on logo click
                    }}
                >
                    TestCo
                </Link>

                <motion.ul
                    variants={fadeIn("center", "", 0.5, 1)}
                    initial="hidden"
                    animate="show"
                    className="list-none hidden sm:flex flex-row gap-10"
                >
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`${
                                active === nav.title ? "text-white" : "text-cyan-400"
                            } hover:text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => {
                                setActive(nav.title);
                            }}
                        >
                            <Link smooth to={`/#${nav.id}`}>
                                {nav.title}
                            </Link>
                        </li>
                    ))}
                </motion.ul>

                <div className={`flex flex-row gap-5 bg-blue-500`}>
                    <button
                        className={`h  bg-myColor-primary rounded-lg border-2 border-myColor-primary p-2`}>
                        Sign In
                    </button>
                    <button
                        className={`h  hover:bg-myColor-primary rounded-lg border-2 border-myColor-primary p-2`}>
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar_Landing;
