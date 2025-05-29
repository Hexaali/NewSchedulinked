"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Alert } from "@material-tailwind/react";
import LightDarkButton from "./LightDarkButton";
import ModalButtonForm from "./ModalButtonForm";
import SignInForm from "./SIgnInForm";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [openSignUp, setOpenSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasUserQuery, setHasUserQuery] = useState(false);

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
    setTimeout(() => setAlert({ show: false, message: "", type: "green" }), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    showAlert("You have been logged out.", "green");
    navigate("/");  // Use React Router navigate instead of window.location.href
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
              onClose: () => setAlert({ show: false, message: "", type: "green" }),
            }}
          >
            {alert.message}
          </Alert>
        </div>
      )}

      {/* Navbar */}
      <nav className="blurred fixed z-30 w-full p-4 px-4 sm:px-8 md:px-16 bg-white dark:bg-gray-900 shadow-md flex flex-wrap items-center justify-between backdrop-blur-md">
        <div className="flex items-center">
          <Image
            src="/SchedulinkedLogo.png"
            alt="Schedulinked Logo"
            width={120}
            height={80}
            className="w-28 sm:w-36 md:w-44 h-auto"
          />
        </div>

        <div className="flex items-center justify-end gap-4 sm:gap-6 md:gap-10 ml-auto">
          {!(
            pathname === "/" && hasUserQuery
          ) && (
            isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="text-xs sm:text-sm md:text-base bg-red-500 text-white font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-md hover:scale-105 transition-transform"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={handleSignUpOpen}
                className="text-xs sm:text-sm md:text-base bg-gradient-to-tr from-yellow-400 to-green-500 text-black font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-md hover:scale-105 transition-transform"
              >
                Sign In
              </Button>
            )
          )}

          <div className="scale-90 sm:scale-100">
            <LightDarkButton />
          </div>
        </div>
      </nav>

      {/* Modal Login Form */}
      <ModalButtonForm open={openSignUp} handleOpen={handleSignUpOpen}>
        <SignInForm closeModal={handleLogin} />
      </ModalButtonForm>
    </>
  );
}
