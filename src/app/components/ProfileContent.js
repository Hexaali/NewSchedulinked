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
  Alert,
} from "@material-tailwind/react";

export default function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get("u");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleGoogleAuthResponse = async (token) => {
    try {
      const response = await fetch("http://192.168.10.177:8000/api/v1/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          google_token: token,
          username: username,
          email: userData?.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save Google Calendar integration");
      }

      setSuccess("Google Calendar integration successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  const getGoogleCalendarToken = () => {
    const CLIENT_ID =
      "210346042271-uqajb4u40cpid10in6i7lr59h7u1ln67.apps.googleusercontent.com";
    const REDIRECT_URI = "https://schedulinked.kayman.biz";
    const SCOPES =
      "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email";

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(
      SCOPES
    )}&include_granted_scopes=true`;

    const popup = window.open(authUrl, "googleAuth", "width=500,height=600");
    const checkPopup = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(checkPopup);
          return;
        }

        if (popup.location.href.includes(REDIRECT_URI)) {
          const hash = popup.location.hash;
          const token = new URLSearchParams(hash.substring(1)).get(
            "access_token"
          );
          if (token) {
            handleGoogleAuthResponse(token);
            popup.close();
            clearInterval(checkPopup);
          }
        }
      } catch (e) {}
    }, 500);
  };

  const handleAppleCalendarSubmit = async () => {
    try {
      const hashedPassword = await hashPassword(formData.password);
      console.log("Hashed Password:", hashedPassword);

      const response = await fetch("http://192.168.10.177:8000/api/v1/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          apple_hash: hashedPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save Apple Calendar integration");
      }

      setSuccess("Apple Calendar integration successful!");
      setOpenModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Helper function to hash the password using SHA-256
  const hashPassword = async (password) => {
    // Encode the password into a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Create a hash using SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert ArrayBuffer to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join(""); // Convert bytes to hex string

    return hashHex;
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
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-20 w-20 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 text-black dark:text-white p-6">
      {error && (
        <Alert color="red" className="mb-4 max-w-sm">
          {error}
        </Alert>
      )}
      {success && (
        <Alert color="green" className="mb-4 max-w-sm">
          {success}
        </Alert>
      )}

      <div className="flex flex-col items-center gap-2">
        <div className="relative w-28 h-28 mb-4">
          <Image
            src={userData?.image || "/london.jpg"}
            alt="Profile Picture"
            fill
            className="object-fill rounded-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1200px"
          />
        </div>
        <Typography variant="h2" className="text-xl font-semibold">
          @{userData?.username || "Username"}
        </Typography>
      </div>

      <div className="flex flex-col gap-4 mt-4 w-full max-w-sm">
        <Button
          onClick={getGoogleCalendarToken}
          className="flex items-center justify-center gap-2 bg-white text-black border border-gray-500 py-3 rounded-full hover:bg-gray-100 transition"
        >
          <Image src="/google.png" alt="Google" width={20} height={20} />
          Add to Google Calendar
        </Button>
        <Button
          onClick={() => setOpenModal(true)}
          className="flex items-center justify-center gap-2 bg-white text-black border border-gray-500 py-3 rounded-full hover:bg-gray-100 transition"
        >
          <Image src="/apple.png" alt="Apple" width={20} height={20} />
          Add to Apple Calendar
        </Button>
      </div>

      <Dialog
        open={openModal}
        handler={() => setOpenModal(!openModal)}
        className="bg-gradient-to-tr from-yellow-400 to-green-500"
      >
        <DialogHeader>Apple Calendar Login</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
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
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button color="blue" onClick={handleAppleCalendarSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
