"use client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignInForm from "./components/SIgnInForm";
import SignupForm from "./components/SignUpForm";
import Feed from "./components/Feed";
import ProfilePageWrapper from "./components/ProfilePageWrapper";



export default function ClientSideRouter() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/login" element={<SignInForm />} />
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/feed" element={<Feed />} />
    <Route path="/" element={<ProfilePageWrapper />} />
    <Route path="/:username" element={<ProfilePageWrapper />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</BrowserRouter>

  );
}
