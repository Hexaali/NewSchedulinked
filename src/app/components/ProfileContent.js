// components/ProfileContent.js
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";

export default function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get("u");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!username) {
          router.push("/invalid-username/");
          return;
        }
        const res = await fetch(
          `https://schedulinked.kayman.biz/api/v1/profile/${username}`
        );
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        router.push("/not-found/");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [username, router]);

  const getGoogleCalendarToken = () => {
    const CLIENT_ID =
      "210346042271-uqajb4u40cpid10in6i7lr59h7u1ln67.apps.googleusercontent.com";
    const REDIRECT_URI = "https://schedulinked.kayman.biz";
    const SCOPES =
      "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email";

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${
      userData.id
    }&scope=${encodeURIComponent(
      SCOPES
    )}&include_granted_scopes=true&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
  };

  const handleAppleCalendarSubmit = () => {
    if (formData.email && formData.password) {
      const appleHash = btoa(formData.email + ":" + formData.password);
      fetch("https://schedulinked.kayman.biz/api/v1/follow", {
        method: "POST",
        body: JSON.stringify({
          apple_hash: appleHash,
          artist: userData.id,
          email: formData.email,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(console.log)
        .catch(console.error);
    }
    setOpenModal(false);
  };

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h4">No username provided</Typography>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Spinner className="h-20 w-20 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 
      bg-gradient-to-br from-white via-green-100 to-yellow-100 
      dark:from-black dark:via-green-900 dark:to-yellow-800 
      transition-all duration-500"
    >
      {/* Transparent, blurred card */}
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur shadow-xl rounded-3xl p-8 w-full max-w-md text-center transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28">
            <Image
              src={userData?.image || "/london.jpg"}
              alt="Profile Picture"
              fill
              className="object-cover rounded-full shadow-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1200px"
            />
          </div>
          <Typography
            variant="h5"
            className="font-bold text-xl text-gray-900 dark:text-white"
          >
            @{userData?.username || "Username"}
          </Typography>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            onClick={getGoogleCalendarToken}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-yellow-400 text-white py-3 rounded-full shadow-md hover:opacity-90 transition"
          >
            <Image src="/google.png" alt="Google" width={20} height={20} />
            Add to Google Calendar
          </Button>
          <Button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white py-3 rounded-full shadow-md hover:opacity-90 transition"
          >
            <Image src="/apple.png" alt="Apple" width={20} height={20} />
            Add to Apple Calendar
          </Button>
        </div>
      </div>

      <Dialog
        open={openModal}
        handler={() => setOpenModal(!openModal)}
        className="dark:bg-gray-900 bg-white rounded-xl"
      >
        <DialogHeader className="text-xl font-semibold text-gray-800 dark:text-white">
          Apple Calendar Login
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            label="Email / Apple ID"
            type="email"
            value={formData.email}
            color="blue"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="App Password"
            type="password"
            value={formData.password}
            color="blue"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 text-white"
            onClick={handleAppleCalendarSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
