'use client';

import { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import SignupForm from "./SignUpForm";
import ModalButtonForm from "./ModalButtonForm";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const HeadingHomepage = dynamic(() => import("./HeadingHomepage"), {
  ssr: false,
});

export default function LandingPage() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSignInOpen = () => setOpenSignIn(!openSignIn);

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      router.push("/feed");
    }
  }, [router]);

  if (!hasMounted) return null;

  return (
    <section className="relative flex items-center justify-center p-8 md:p-20 min-h-screen overflow-hidden bg-black">
      <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
        <source src="/landing.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      <div className="flex flex-col items-center justify-center relative z-20 w-full md:w-1/2 text-center md:text-left px-4 pt-20">
        <HeadingHomepage />
        <Typography variant="paragraph" className="text-gray-300 mb-8">
          Artists post events. Fans sync them to their calendars. Apple or Google just one tap.
        </Typography>

        {!isLoggedIn && (
          <Button onClick={handleSignInOpen} className="bg-gradient-to-tr from-yellow-400 to-green-500 text-black">
            Register as an Artist
          </Button>
        )}
      </div>

      <ModalButtonForm open={openSignIn} handleOpen={handleSignInOpen}>
        <SignupForm closeModal={handleSignInOpen} />
      </ModalButtonForm>
    </section>
  );
}
