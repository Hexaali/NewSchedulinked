"use client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ProfileContent from "./ProfileContent";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";
import { Spinner } from "@material-tailwind/react";

export default function ProfilePageWrapper() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null); // will hold actual user data
  const [loading, setLoading] = useState(true);   // track loading state

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `https://schedulinked.kayman.biz/api/v1/profile/${username}`
        );

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          setUserData(false); // 404 case
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUserData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (!username) {
    return <LandingPage />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12" color="amber" />
      </div>
    );
  }

  if (!userData) {
    return <NotFound />;
  }

  return <ProfileContent userData={userData} />;
}
