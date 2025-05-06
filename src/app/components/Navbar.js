"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button, Alert } from "@material-tailwind/react";
import LightDarkButton from "./LightDarkButton";
import ModalButtonForm from "./ModalButtonForm";
import SignInForm from "./SIgnInForm";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "green", 
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

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
    router.push("/");
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
      <nav className="blurred fixed z-30 w-full p-4 px-4 sm:px-8 md:px-16 bg-white dark:bg-gray-900 shadow-md flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/image(1).png"
            alt="Logo"
            width={120}
            height={80}
            className="w-28 sm:w-36 md:w-44 h-auto"
          />
        </div>

        <div className="flex items-center justify-end gap-4 sm:gap-6 md:gap-10 ml-auto">
          {(() => {
            // Check if the URL contains `?u=...`
            const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
            const hasUserQuery = searchParams?.has("u");

            // Hide buttons on /?u=... only
            if (pathname === "/" && hasUserQuery) return null;

            return isLoggedIn ? (
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
            );
          })()}

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
