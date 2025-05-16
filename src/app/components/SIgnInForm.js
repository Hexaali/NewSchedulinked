"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./UserContext";
import { CardBody, Typography, Input, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  LockClosedIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function SignInForm({ closeModal }) {
  const router = useRouter();
  const { updateUser } = useUser();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const formContainerRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Check if mobile device and handle keyboard visibility
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleResize = () => {
      checkIfMobile();
      // Detect keyboard visibility by comparing window heights
      const isKeyboardVisible = window.innerHeight < window.outerHeight * 0.8;
      setKeyboardVisible(isKeyboardVisible);
    };

    checkIfMobile();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-focus username field when component mounts
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // Handle keyboard appearance on mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleFocus = (e) => {
      setKeyboardVisible(true);
      setTimeout(() => {
        if (formContainerRef.current && e.target) {
          e.target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      }, 300);
    };

    const handleBlur = () => {
      setKeyboardVisible(false);
    };

    const inputs = formRef.current?.querySelectorAll("input") || [];
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, [isMobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleFieldBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError("Please enter your username and password");
      if (!username) {
        usernameRef.current?.focus();
      } else {
        passwordRef.current?.focus();
      }
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://schedulinked.kayman.biz/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        const userData = {
          username: data.username,
          token: data.token,
          isAuthenticated: true,
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        updateUser(userData);
        if (closeModal) closeModal();
        router.push("/feed");
      } else {
        setError(data.message || "Invalid username or password");
        usernameRef.current?.focus();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      usernameRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white"
    >
      <div
        ref={formContainerRef}
        className={`max-h-[${
          keyboardVisible ? "70vh" : "90vh"
        }] overflow-y-auto pb-4`}
        style={{
          maxHeight: keyboardVisible ? "70vh" : "90vh",
          paddingBottom: keyboardVisible ? "2rem" : "1rem",
        }}
      >
        <CardBody className="space-y-6 px-4">
          <Typography
            variant="h1"
            className="uppercase text-center font-extrabold mb-4 text-xl"
          >
            Sign In
          </Typography>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <InputWithIcon
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFieldFocus("username")}
              onBlur={handleFieldBlur}
              isActive={activeField === "username"}
              inputRef={usernameRef}
              Icon={TagIcon}
            />

            <InputWithIcon
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFieldFocus("password")}
              onBlur={handleFieldBlur}
              isActive={activeField === "password"}
              inputRef={passwordRef}
              Icon={LockClosedIcon}
              color="yellow"
            />

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                <Typography color="red" className="text-center font-medium">
                  {error}
                </Typography>
              </div>
            )}

            {isMobile && activeField && (
              <button
                type="button"
                onClick={() => document.activeElement?.blur()}
                className="text-sm text-yellow-400 text-center w-full mt-2"
              >
                Tap to close keyboard
              </button>
            )}

            <div
              className={`sticky bottom-0 pt-3 -mx-4 px-4 ${
                keyboardVisible ? "pb-4" : ""
              }`}
            >
              <Button
                type="submit"
                color="yellow"
                size="lg"
                fullWidth
                className="font-bold flex items-center justify-center gap-2 transition-transform duration-300 bg-gradient-to-br to-green-500 from-yellow-400 shadow-lg"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}{" "}
                <ArrowRightIcon className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </CardBody>
      </div>
    </motion.div>
  );
}

function InputWithIcon({
  label,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  isActive,
  inputRef,
  Icon,
  type = "text",
  color = "green",
}) {
  return (
    <div className="relative">
      <Input
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        color={color}
        className={`bg-white text-black transition-all duration-200 ${
          isActive ? "ring-2 ring-yellow-400" : ""
        }`}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />
      <Icon
        className={`w-5 h-5 absolute top-3 right-3 transition-colors duration-200 ${
          isActive ? "text-yellow-600" : "text-green-800"
        }`}
      />
    </div>
  );
}
