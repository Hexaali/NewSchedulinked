"use client";
import { useState } from "react";
import Image from "next/image";
import { CardBody, Typography, Input, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  EnvelopeIcon,
  TagIcon,
  ArrowRightIcon,
  LockClosedIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function SignupForm({ closeModal }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name.toLowerCase()]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, firstname, lastname, image } = formData;

    // Validate required fields
    if (!email || !username || !password) {
      alert("Please fill in all required fields");
      return;
    }

    // Create a new FormData object
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);

    // Append optional fields only if they exist
    if (firstname) form.append("first_name", firstname);
    if (lastname) form.append("last_name", lastname);
    
    // Only append image if it exists
    if (image) {
      form.append("profile_picture", image);
    }

    try {
      setLoading(true);
      const res = await fetch("https://schedulinked.kayman.biz/api/v1/register", {
        method: "POST",
        body: form,
      });

      const responseText = await res.text();
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        alert("Server response is not valid JSON. Please try again.");
        return;
      }

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registered successfully!");
      if (closeModal) closeModal();
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-white">
      <CardBody className="space-y-8 px-4 sm:px-8">
        <Typography variant="h2" className="uppercase text-center font-extrabold">
          Join as an Artist
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <InputWithIcon label="First Name" name="firstname" value={formData.firstname} onChange={handleChange} Icon={UserCircleIcon} />
            <InputWithIcon label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} Icon={UserCircleIcon} />
          </div>

          <InputWithIcon label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} Icon={EnvelopeIcon} color="yellow" />
          <InputWithIcon label="Username" name="username" value={formData.username} onChange={handleChange} Icon={TagIcon} />
          <InputWithIcon label="Password" type="password" name="password" value={formData.password} onChange={handleChange} Icon={LockClosedIcon} color="yellow" />

          <div className="relative">
            <label className="block text-sm font-medium text-white mb-2">Profile Image (Optional)</label>
            <div className="flex flex-col gap-3 bg-white px-3 py-2 rounded-md shadow-sm">
              <div className="flex items-center gap-3">
                <PhotoIcon className="w-5 h-5 text-green-800" />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-sm text-black"
                />
              </div>
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="h-24 w-24 rounded-md object-cover border border-green-700"
                  width="40"
                  height="40"
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            color="yellow"
            size="lg"
            fullWidth
            disabled={loading}
            className="font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 bg-gradient-to-br to-green-500 from-yellow-400"
          >
            {loading ? "Signing Up..." : "Sign Up"} <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </form>
      </CardBody>
    </motion.div>
  );
}

function InputWithIcon({ label, name, value, onChange, Icon, type = "text", color = "green" }) {
  return (
    <div className="relative w-full">
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
