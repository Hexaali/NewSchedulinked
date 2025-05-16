"use client";

import { useParams } from "react-router-dom";
import LandingPage from "./LandingPage";
import ProfilePage from "./ProfilePage";

export default function ProfilePageWrapper() {
  const { username } = useParams();

  // If no username (e.g., just "/"), show landing page
  if (!username) {
    return <LandingPage />;
  }

  // Show profile for given username
  return <ProfilePage username={username} />;
}
