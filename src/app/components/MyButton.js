"use client"; 

import React, { useState } from "react";
import axios from "axios";
import Turnstile from "react-turnstile"; 
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Select, Option } from "@material-tailwind/react";
import { Link } from "react-scroll";

const API_URL = "http://localhost:5000/api/send-email"; 

const defaultFormFields = {
  title: "Book Appointment",
  description: "We will get back to you soon.",
  NamePlaceHolder: "Name",
  EmailPlaceholder: "Email",
  PhoneNumberPlaceHolder: "Enter your phone number",
  Service: "Select a Service",
  submitText: "Submit",
};

export function MyButton({
  btnText,
  withForm = false,
  formFields = defaultFormFields,
  scrollTo = "",
  buttonClasses = "",
  dialogClasses = "",
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    captchaToken: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle service dropdown change
  const handleServiceChange = (service) => {
    setFormData({ ...formData, service });
  };

  // Handle CAPTCHA token retrieval
  const handleCaptchaSuccess = (token) => {
    console.log("Turnstile Token:", token); 
    setFormData({ ...formData, captchaToken: token });
  };

  // Submit form with CAPTCHA validation
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.captchaToken) {
      setMessage("All fields and CAPTCHA are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(API_URL, formData);
      if (response.status === 200) {
        setMessage("Email sent successfully!");
        setFormData({ name: "", email: "", phone: "", service: "", captchaToken: "" });
        setTimeout(() => {
          setOpen(false);
          setMessage("");
        }, 2000);
      } else {
        setMessage(response.data.message || "Failed to send email.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {scrollTo ? (
        <Link to={scrollTo} smooth={true} offset={-70} duration={500}>
          <Button className={`py-4 px-8 rounded-full ${buttonClasses}`}>
            {btnText}
          </Button>
        </Link>
      ) : (
        <Button className={`py-4 px-8 rounded-full ${buttonClasses}`} onClick={() => setOpen(true)}>
          {btnText}
        </Button>
      )}

      {withForm && (
        <Dialog size="md" open={open} handler={() => setOpen(false)} className={dialogClasses}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4">{formFields.title}</Typography>
              <Typography className="mb-3">{formFields.description}</Typography>

              <Input label={formFields.NamePlaceHolder} name="name" size="lg" value={formData.name} onChange={handleChange} />
              <Input label={formFields.EmailPlaceholder} name="email" size="lg" value={formData.email} onChange={handleChange} />
              <Input label={formFields.PhoneNumberPlaceHolder} name="phone" size="lg" value={formData.phone} onChange={handleChange} />

              <Typography variant="h6">{formFields.Service}</Typography>
              <Select label="Choose Procedure" value={formData.service} onChange={(e) => handleServiceChange(e)}>
                <Option value="Dental Checkup">Dental Checkup</Option>
                <Option value="Teeth Whitening">Teeth Whitening</Option>
                <Option value="Orthodontics">Orthodontics</Option>
              </Select>

              
              <Turnstile
                sitekey="0x4AAAAAAA8zB_fFtXg8ix3N"
                onVerify={handleCaptchaSuccess}
                theme="light"
              />

              {message && <Typography className={`text-${message.includes("success") ? "green" : "red"}-500`}>{message}</Typography>}
            </CardBody>

            <CardFooter>
              <Button onClick={handleSubmit} fullWidth disabled={loading}>
                {loading ? "Submitting..." : formFields.submitText}
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      )}
    </>
  );
}
