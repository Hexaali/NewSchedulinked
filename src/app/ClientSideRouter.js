"use client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useTheme } from "./components/ThemeContext"; 
import SignInForm from "./components/SIgnInForm";
import SignupForm from "./components/SignUpForm";
import Feed from "./components/Feed";
import ProfilePageWrapper from "./components/ProfilePageWrapper";
import Navbar from "./components/Navbar";
import { FooterWithSocialLinks } from "./components/Footer";
import { PricingSection } from "./components/PricingSec";
import { HowItWorks } from "./components/HowItWorks";

export default function ClientSideRouter() {
  // const { darkMode } = useTheme();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     document.documentElement.classList.toggle("dark", darkMode);
  //   }
  // }, [darkMode]);

  return (
    <BrowserRouter>
    {/* <div className="bg-gradient-to-br from-yellow-600 to-green-500 dark:from-gray-900 dark:via-gray-800 dark:to-yellow-600"> */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<SignInForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/" element={<ProfilePageWrapper />} />
        <Route path="/:username" element={<ProfilePageWrapper />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <HowItWorks />
      <PricingSection />
      <FooterWithSocialLinks />
      {/* </div> */}
    </BrowserRouter>
  );
}
