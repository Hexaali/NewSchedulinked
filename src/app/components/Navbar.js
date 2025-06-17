"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Alert } from "@material-tailwind/react";
import { Link } from "react-scroll";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import ModalButtonForm from "./ModalButtonForm";
import SignInForm from "./SIgnInForm";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [openSignUp, setOpenSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasUserQuery, setHasUserQuery] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "green",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setHasUserQuery(searchParams.has("u"));
    }
  }, []);

  const handleSignUpOpen = () => {
    setOpenSignUp(!openSignUp);
  };

  const showAlert = (message, type = "green") => {
    setAlert({ show: true, message, type });
    setTimeout(
      () => setAlert({ show: false, message: "", type: "green" }),
      3000
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    showAlert("You have been logged out.", "green");
    navigate("/");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setOpenSignUp(false);
    localStorage.setItem("isLoggedIn", "true");
    showAlert("Successfully signed in!", "green");
  };

  return (
    <>
      {alert.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-[400px]">
          <Alert
            color={alert.type}
            variant="filled"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
            animate={{
              mount: { y: 0 },
              unmount: { y: -100 },
            }}
            dismissible={{
              onClose: () =>
                setAlert({ show: false, message: "", type: "green" }),
            }}
          >
            {alert.message}
          </Alert>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed z-30 w-full py-6 px-6 sm:px-8 md:px-24 bg-white/60 shadow-md flex items-center justify-between backdrop-blur-md">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Image
            src="/Schedulinked.png"
            alt="Schedulinked Logo"
            width={32}
            height={32}
          />
          <span className="font-extrabold text-2xl text-gray-800">
            Schedulinked
          </span>{" "}
        </div>
        <div className="hidden md:flex items-center gap-8 ml-auto">
          <Link
            to="how"
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer text-sm text-gray-700 hover:text-black font-medium transition-colors"
          >
            How It Works
          </Link>
          <Link
            to="pricing"
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer text-sm text-gray-700 hover:text-black font-medium transition-colors"
          >
            Pricing
          </Link>
          <Button
            size="sm"
            onClick={handleSignUpOpen}
            className="text-xs normal-case sm:text-sm md:text-sm bg-white text-black border border-black font-bold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="text-xs normal-case sm:text-sm md:text-sm bg-limeCustom text-black font-bold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Get Started
          </Button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {menuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-[64px] left-0 w-full bg-white shadow-md z-[40] py-4 px-8 flex flex-col gap-4">
          <Link
            to="how"
            smooth={true}
            duration={500}
            offset={-80}
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer text-gray-700 hover:text-black font-medium transition-colors"
          >
            How It Works
          </Link>
          <Link
            to="pricing"
            smooth={true}
            duration={500}
            offset={-80}
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer text-gray-700 hover:text-black font-medium transition-colors"
          >
            Pricing
          </Link>
          <Button
            size="sm"
            onClick={() => {
              setMenuOpen(false);
              handleSignUpOpen();
            }}
            className="w-22 bg-white text-white font-bold py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            onClick={() => setMenuOpen(false)}
            className="w-22 bg-limeCustom text-black font-bold py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Get Started
          </Button>
        </div>
      )}

      <ModalButtonForm open={openSignUp} handleOpen={handleSignUpOpen}>
        <SignInForm closeModal={handleLogin} />
      </ModalButtonForm>
    </>
  );
}
