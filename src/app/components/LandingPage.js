import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignUpForm";
import ModalButtonForm from "./ModalButtonForm";
import HeadingHomepage from "./HeadingHomepage";
import { Button } from "@material-tailwind/react";

export default function LandingPage() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [type, setType] = useState("artist");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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
    <section className="relative flex items-center justify-center p-8 md:p-20 min-h-screen overflow-hidden bg-gradient-to-br from-yellow-600 to-green-500 dark:from-gray-900 dark:via-gray-800 dark:to-yellow-600">
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />
      <div className="flex flex-col items-center justify-center relative z-20 w-full md:w-1/2 text-center md:text-left px-4 pt-20">
        <HeadingHomepage />

        <div className="flex flex-row space-x-2 mt-6">
          {!isLoggedIn && (
            <Button
              onClick={() => toggleModal("artist")}
              className="bg-gradient-to-tr from-yellow-400 to-green-500 text-black"
            >
              Register as an Artist
            </Button>
          )}
          <Button
            onClick={() => toggleModal("business")}
            className="bg-gradient-to-tr to-green-500 from-yellow-400 text-black"
          >
            Register as a Business
          </Button>
        </div>
      </div>

      <ModalButtonForm open={openSignIn} handleOpen={() => toggleModal(type)}>
        <SignupForm closeModal={() => toggleModal(type)} type={type} />
      </ModalButtonForm>
    </section>
  );
}
