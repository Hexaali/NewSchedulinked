import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignUpForm";
import ModalButtonForm from "./ModalButtonForm";
// import HeadingHomepage from "./HeadingHomepage";
import { Button, Typography } from "@material-tailwind/react";
import { API_BASE_URL } from "@/constants";
import HeroSection from "./HeroSection";
import SignInForm from "./SIgnInForm";

export default function LandingPage() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [type, setType] = useState("artist");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (code && state) {
        try {
          const decoded = atob(state);
          const payload = JSON.parse(decoded);

          const response = await fetch(`${API_BASE_URL}/api/v1/follow`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              artist: payload.user_id,
              first_name: payload.first_name,
              last_name: payload.last_name,
              google_token: code,
            }),
          });

          const result = await response.json();
          console.log("Follow result:", result);
        } catch (error) {
          console.error("Failed to handle Google OAuth redirect:", error);
        }

        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    };

    handleOAuthRedirect();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
      navigate("/feed");
    }
  }, [navigate]);

  const toggleModal = (newType) => {
    setType(newType);
    setOpenSignIn((prev) => !prev);
  };

  return (
    <HeroSection className="relative flex items-center justify-center p-8 md:p-20 min-h-screen overflow-hidden ">
      <div className="w-4/5 h-screen flex flex-col items-center justify-center ">
        {/* <HeadingHomepage /> */}
        <Typography className="text-4xl md:text-6xl lg:text-7xl font-bold px-2 text-center leading-tight tracking-tight">
          Marketing people actually want.
        </Typography>
        <Typography
          variant="lead"
          className="text-gray-600 py-4 text-2xl text-center"
        >
          Schedulinked puts your content straight into calendars — with
          reminders, media, and automation — no inbox, no noise, just visibility
          that works.
        </Typography>

        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 mt-6 items-center justify-center">
          <Button
            variant="outlined"
            size="md"
            className="normal-case text-black text- text-md font-bold rounded-full shadow-lg bg-limeCustom border-limeCustom lg:mb-0 sm:mb-4"
          >
            Join The Waitlist
          </Button>
          <Button
            variant="outlined"
            size="md"
            className="normal-case text-black font-bold rounded-full text-md"
          >
            See How It Works
          </Button>
        </div>
      </div>

      <ModalButtonForm open={openSignIn} handleOpen={() => toggleModal(type)}>
        <SignupForm closeModal={() => toggleModal(type)} type={type} />
      </ModalButtonForm>
    </HeroSection>
  );
}
