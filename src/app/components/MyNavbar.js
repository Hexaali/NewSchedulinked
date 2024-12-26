"use client";

import React from "react";
import { Navbar, Collapse, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MyButton } from "./MyButton";
import { Link as ScrollLink } from "react-scroll";
import { useTheme } from "../ThemeContext";
import { useEffect } from "react";


function NavList() {
  return (

    <ul className="mt-4 pl-6 font-poppins flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6" >
      <Typography
        as="li"
        variant="paragraph"
        className="p-1 text-brown-200 font-medium relative group"
      >
        <ScrollLink
          to="procedures"
          smooth={true}
          duration={500}
          className="flex items-center transition-colors font-normal cursor-default"
        >
          Procedures
        </ScrollLink>
        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className="p-1 text-brown-200  font-medium relative group"
      >
        <ScrollLink
          to="testimonials"
          smooth={true}
          duration={500}
          className="flex items-center transition-colors font-normal cursor-default"
        >
          Testimonials
        </ScrollLink>
        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className="p-1 text-brown-200 font-medium relative group"
      >
        <ScrollLink
          to="team"
          smooth={true}
          duration={500}
          className="flex items-center transition-colors font-normal cursor-default"
        >
          Our Team
        </ScrollLink>
        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className="p-1 text-brown-200 font-medium relative group"
      >
        <ScrollLink
          to="aboutus"
          smooth={true}
          duration={500}
          className="flex items-center transition-colors font-normal cursor-default"
        >
          About Us
        </ScrollLink>
        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
      </Typography>
      <li className="lg:hidden mt-4">
        <MyButton withForm={true} buttonClasses="bg-brown-200 text-white hover:bg-white hover:text-brown-200" btnText="Book Appointment" />
      </li>
    </ul>

  );
}

function TopList() {
  return (
    <div className="hidden font-poppins flex lg:flex items-center justify-center mb-2 gap-20 lg:mb-0">
      <div className="flex items-center gap-2 text-xs pr-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6 text-brown-200 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l9 6 9-6"
          />
        </svg>
        <a href="mailto:Manuella7708@gmail.com" className="text-white hover:text-brown-50 transition-colors mr-20 ">
          Manuella7708@gmail.com
        </a>
        <div className="flex items-center gap-2 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-brown-200 ml-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 2H17C18.1046 2 19 2.89543 19 4V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2ZM12 18H12.01" />
          </svg>
          <a href="tel:+923414114142" className="text-white hover:text-brown-50 transition-colors">
            (92) 341-4114142
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
    // Apply dark or light theme to the body element on load
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar blurred={false} fullWidth={true} className="sticky top-0 bg-brown-100 z-20 mx-auto max-w-screen-3xl px-4 py-2 dark:bg-gray-700 dark:text-gray-100">
      <div className="flex items-center justify-between ">
        <div className="relative flex items-center">
          <img src="/7oaks/logo.png" alt="Logo" className="h-28 w-28 lg:ml-8" />
          <Typography
            variant="small"
            className="
                absolute left-[100px] top-8 whitespace-nowrap font-alexBrush 
                text-lg sm:text-xl md:text-2xl lg:text-xl font-extrabold text-brown-50
                xs: left-[120px] sm:left-[170px] md:left-[120px] lg:left-[150px] mt-4
              "
          >
            7 Oaks Dental
          </Typography>
        </div>
        <div className="hidden lg:flex flex-col items-center justify-center flex-grow">
          <div className="flex flex-col lg:pl-28">
            <TopList />
            <NavList />
          </div>
        </div>
        <div className="hidden lg:block pr-4">
          <MyButton
            data-aos="fade-left" data-aos-duration="3000"
            btnText="Book Apointment"
            buttonClasses="bg-brown-200 text-brown-white hover:bg-white hover:text-brown-100"
            withForm={true}
            formFields={{
              title: "Book Appointment",
              description: "We will get back to you soon.",
              NamePlaceHolder: "Enter Your Name",
              FirstNamePlaceHolder: "Name",
              Email: "Your Email",
              EmailPlaceholder: "Email",
              PhoneNumber: "Number",
              PhoneNumberPlaceHolder: "Your Phone Number",
              submitText: "Submit",
            }}
          />
        </div>
        <div className="flex items-center gap-4 pr-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300 ease-in-out"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              // Sun Icon for Light Mode
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="currentColor" className="size-6">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
                  className="w-6 h-6 text-yellow-500 transition-transform duration-1000 ease-in-out transform scale-110" />
              </svg>
            ) : (
              // Moon Icon for Dark Mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-800 dark:text-gray-200 transition-transform duration-300 ease-in-out transform scale-110"
              >
                <path
                  fillRule="evenodd"
                  d="M21.72 13.06A9 9 0 0111.09 2.37 8.94 8.94 0 0012 22 9.001 9.001 0 0021.72 13.06z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-black text-brown-300 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}



