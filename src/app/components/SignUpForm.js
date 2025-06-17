"use client";
import { useState, useRef, useEffect } from "react";
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
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { API_BASE_URL } from "@/constants";

export default function SignupForm({ closeModal, type = "artist" }) {
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
  const [error, setError] = useState("");
  const [activeField, setActiveField] = useState(null);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

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

  const handleFieldFocus = (fieldName) => setActiveField(fieldName);
  const handleFieldBlur = () => setActiveField(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, firstname, image } = formData;

    if (!email) {
      setError("Email is required");
      emailRef.current?.focus();
      return;
    }
    if (!username) {
      setError("Username is required");
      usernameRef.current?.focus();
      return;
    }
    if (!password) {
      setError("Password is required");
      passwordRef.current?.focus();
      return;
    }

    // Parse name
    let firstName = "",
      lastName = "";
    const nameParts = firstname.trim().split(/\s+/);
    firstName = nameParts[0] || "";
    lastName = nameParts.slice(1).join(" ") || "_";

    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);
    form.append("first_name", firstName);
    form.append("last_name", lastName);
    form.append("type", type.toUpperCase());
    if (image) form.append("profile_picture", image);

    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/v1/register`, {
        method: "POST",
        body: form,
      });

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        setError("Server response is not valid JSON. Please try again.");
        return;
      }

      if (!res.ok) {
        setError(data.message || "Registration failed");
        if (data.message?.toLowerCase().includes("email")) {
          emailRef.current?.focus();
        } else if (data.message?.toLowerCase().includes("username")) {
          usernameRef.current?.focus();
        } else {
          nameRef.current?.focus();
        }
        return;
      }

      alert("Registered successfully!");
      if (closeModal) closeModal();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      nameRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white flex flex-col max-h-[90vh]"
    >
      <div className="flex-1 overflow-y-auto scroll-pb-36 px-2 sm:px-8">
        <CardBody className="space-y-6 pb-6">
          <Typography
            variant="h2"
            className="uppercase text-center font-extrabold pt-4 pb-2 text-xl"
          >
            Join as {type === "artist" ? "an Artist" : "a Business"}
          </Typography>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-center">
              <Typography color="red" className="font-medium">
                {error}
              </Typography>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputWithIcon
              label={type === "artist" ? "Full Name" : "Business Name"}
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              onFocus={() => handleFieldFocus("firstname")}
              onBlur={handleFieldBlur}
              isActive={activeField === "firstname"}
              inputRef={nameRef}
              Icon={type === "artist" ? UserCircleIcon : BuildingOfficeIcon}
              required
            />

            <InputWithIcon
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFieldFocus("email")}
              onBlur={handleFieldBlur}
              isActive={activeField === "email"}
              inputRef={emailRef}
              Icon={EnvelopeIcon}
              color="yellow"
              required
            />

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
              required
            />

            <InputWithIcon
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFieldFocus("password")}
              onBlur={handleFieldBlur}
              isActive={activeField === "password"}
              inputRef={passwordRef}
              Icon={LockClosedIcon}
              color="yellow"
              required
            />

            <div className="relative pb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Profile Image (Optional)
              </label>
              <div
                className={`flex flex-col gap-3 bg-white px-3 py-2 rounded-md shadow-sm transition-all duration-200 ${
                  activeField === "image" ? "ring-2 ring-yellow-400" : ""
                }`}
                onClick={() => imageRef.current?.click()}
                onFocus={() => handleFieldFocus("image")}
                onBlur={handleFieldBlur}
                tabIndex={0}
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  <PhotoIcon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      activeField === "image"
                        ? "text-yellow-600"
                        : "text-green-800"
                    }`}
                  />
                  <span className="text-sm text-gray-700">Choose an image</span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    ref={imageRef}
                  />
                </div>
                {previewUrl && (
                  <div className="flex justify-center pt-2">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-md object-cover border border-green-700"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardBody>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-10 px-4 sm:px-8 pt-3 pb-4 border-t">
        <Button
          type="submit"
          color="yellow"
          size="lg"
          fullWidth
          disabled={loading}
          onClick={handleSubmit}
          className="font-bold flex items-center justify-center gap-2 transition-transform duration-300 bg-gradient-to-br to-green-500 from-yellow-400 dark:bg-gradient-button-dark shadow-lg"
        >
          {loading ? "Signing Up..." : "Sign Up"}{" "}
          <ArrowRightIcon className="w-5 h-5" />
        </Button>
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
  required = false,
}) {
  return (
    <div className="relative w-full">
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
        required={required}
      />
      <Icon
        className={`w-5 h-5 absolute top-3 right-3 transition-colors duration-200 ${
          isActive ? "text-yellow-600" : "text-green-800"
        }`}
      />
    </div>
  );
}
