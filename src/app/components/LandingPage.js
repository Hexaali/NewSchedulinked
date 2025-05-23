"use client";

import { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load heading to avoid hydration mismatch
const HeadingHomepage = dynamic(() => import("./HeadingHomepage"), {
  ssr: false,
});
import SignupForm from "./SignUpForm";
import ModalButtonForm from "./ModalButtonForm";

export default function LandingPage() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Prevent hydration issues

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
      router.push("/feed");
    }
  }, [router]);

  const toggleModal = () => setOpenSignIn((prev) => !prev);

  if (!isClient) return null;

  return (
    <section className="relative flex items-center justify-center p-8 md:p-20 min-h-screen overflow-hidden bg-gradient-to-br from-yellow-600 to-green-500 dark:from-gray-900 dark:via-gray-800 dark:to-yellow-600">
      {/* Background Video */}
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/landing.mp4" type="video/mp4" />
      </video> */}

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Foreground Content */}
      <div className="flex flex-col items-center justify-center relative z-20 w-full md:w-1/2 text-center md:text-left px-4 pt-20">
        <HeadingHomepage />
        
        <div className="flex flex-row space-x-2 mt-6">
          {!isLoggedIn && (
            <Button
              onClick={toggleModal}
              className="bg-gradient-to-tr from-yellow-400 to-green-500 text-black"
            >
              Register as an Artist
            </Button>
          )}
          <Button className="bg-gradient-to-tr to-green-500 from-yellow-400  text-black">
            Register as an Business
          </Button>
        </div>
      </div>

      {/* Modal */}
      <ModalButtonForm open={openSignIn} handleOpen={toggleModal}>
        <SignupForm closeModal={toggleModal} />
      </ModalButtonForm>
    </section>
  );
}
