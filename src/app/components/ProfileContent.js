"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default function ProfileContent({ userData }) {
  const [openAppleModal, setOpenAppleModal] = useState(false);
  const [openGoogleModal, setOpenGoogleModal] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
  });

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (code && state) {
        try {
          const decoded = atob(state);
          const payload = JSON.parse(decoded);

          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);

          const res = await fetch(
            "https://schedulinked.kayman.biz/api/v1/follow",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                artist: payload.user_id,
                first_name: payload.first_name,
                last_name: payload.last_name,
                google_code: code,
              }),
            }
          );

          const result = await res.json();
          console.log("Google follow result:", result);
        } catch (error) {
          console.error("Error handling Google OAuth redirect:", error);
        }
      }
    };

    handleOAuthRedirect();
  }, []);

  const getGoogleCalendarToken = () => {
    const CLIENT_ID =
      "210346042271-uqajb4u40cpid10in6i7lr59h7u1ln67.apps.googleusercontent.com";
    const REDIRECT_URI = "https://schedulinked.kayman.biz";
    const SCOPES = "https://www.googleapis.com/auth/calendar";

    const payload = {
      user_id: userData?.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
    };

    const encodedState = btoa(JSON.stringify(payload));

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: SCOPES,
      include_granted_scopes: "true",
      access_type: "offline",
      prompt: "consent",
      state: encodedState,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/auth?${params.toString()}`;
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
          first_name: formData.first_name,
          last_name: formData.last_name,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(console.log)
        .catch(console.error);
    }
    setOpenAppleModal(false);
  };

  const handleGoogleCalendarSubmit = () => {
    getGoogleCalendarToken();
    setOpenGoogleModal(false);
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h4">Loading profile...</Typography>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 
      bg-gradient-to-br from-yellow-600 to-green-500 dark:from-gray-900 dark:via-gray-800 dark:to-yellow-600
      transition-all duration-500"
    >
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur shadow-xl rounded-3xl p-8 w-full max-w-md text-center transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28">
            <Image
              src={userData?.profile_picture || "/london.jpg"}
              alt="Profile Picture"
              fill
              className="object-cover rounded-full shadow-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1200px"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <Typography
            variant="h4"
              className="text-white"
            >
              {`${capitalize(userData?.first_name)} ${capitalize(
                userData?.last_name
              )}`.trim() || "No Name"}
            </Typography>
            <Typography
              className="text-sm text-white mt-2"
            >
              @{userData?.username || "No User"}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            onClick={() => setOpenGoogleModal(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-yellow-400 text-white py-3 rounded-full shadow-md hover:opacity-90 transition"
          >
            <Image src="/google.png" alt="Google" width={20} height={20} />
            Add to Google Calendar
          </Button>

          <Button
            onClick={() => setOpenAppleModal(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white py-3 rounded-full shadow-md hover:opacity-90 transition"
          >
            <Image src="/apple.png" alt="Apple" width={20} height={20} />
            Add to Apple Calendar
          </Button>
        </div>
      </div>

      {/* Google Modal */}
      <Dialog
        open={openGoogleModal}
        handler={() => setOpenGoogleModal(!openGoogleModal)}
        className="dark:bg-gray-900 bg-white rounded-xl"
      >
        <DialogHeader className="text-xl font-semibold text-gray-800 dark:text-white">
          Google Calendar Info
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            label="First Name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          <Input
            label="Last Name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="gray"
            onClick={() => setOpenGoogleModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-green-600 text-white"
            onClick={handleGoogleCalendarSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Apple Modal */}
      <Dialog
        open={openAppleModal}
        handler={() => setOpenAppleModal(!openAppleModal)}
        className="dark:bg-gray-900 bg-white rounded-xl"
      >
        <DialogHeader className="text-xl font-semibold text-gray-800 dark:text-white">
          Apple Calendar Login
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            label="First Name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          <Input
            label="Last Name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          <Input
            label="Email / Apple ID"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="App Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="gray"
            onClick={() => setOpenAppleModal(false)}
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
