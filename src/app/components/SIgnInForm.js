"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { CardBody, Typography, Input, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ArrowRightIcon, LockClosedIcon, TagIcon } from "@heroicons/react/24/outline";

export default function SignInForm({ closeModal }) {
  const router = useRouter();
  const { updateUser } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      alert("Please enter your username and password");
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
      console.log("Login response:", data);

      if (res.ok && data.token) {
        // Create user object from the API response
        const userData = {
          username: data.username,
          token: data.token,
          // Add any other default user properties you need
          isAuthenticated: true
        };

        try {
          // Save to localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(userData));
          
          // Update context
          updateUser(userData);

          // Close modal and redirect
          if (closeModal) closeModal();
          router.push("/feed");
        } catch (storageError) {
          console.error("LocalStorage error:", storageError);
          setError("Failed to save login data. Please try again.");
        }
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
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
      <CardBody className="space-y-8">
        <Typography variant="h1" className="uppercase text-center font-extrabold">
          Sign In
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon label="Username" name="username" value={formData.username} onChange={handleChange} Icon={TagIcon} />
          <InputWithIcon label="Password" name="password" type="password" value={formData.password} onChange={handleChange} Icon={LockClosedIcon} color="yellow" />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            color="yellow"
            size="lg"
            fullWidth
            className="font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 bg-gradient-to-br to-green-500 from-yellow-400"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"} <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </form>
      </CardBody>
    </motion.div>
  );
}

function InputWithIcon({ label, name, value, onChange, Icon, type = "text", color = "green" }) {
  return (
    <div className="relative">
      <Input
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        color={color}
        className="bg-white text-black"
      />
      <Icon className="w-5 h-5 absolute top-3 right-3 text-green-800" />
    </div>
  );
}
