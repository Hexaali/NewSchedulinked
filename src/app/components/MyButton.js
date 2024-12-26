"use client";
import React, { useState } from "react";
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Select, Option } from "@material-tailwind/react";
import { Link } from "react-scroll"; // Import Link from react-scroll

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
  withForm = false, // Default is false
  formFields = defaultFormFields,
  scrollTo = "", // Scroll target section ID
  buttonClasses = "", // Custom button classes
  dialogClasses = "", // Custom dialog classes
}) {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  const handleClick = () => {
    if (withForm) {
      setOpen(true); // Open form dialog
    }
  };

  return (
    <>
      {/* If scrollTo prop is passed, use Link for scrolling */}
      {scrollTo ? (
        <Link to={scrollTo} smooth={true} offset={-70} duration={500}>
          <Button
            className={`py-4 px-8 rounded-full transition duration-300 flex items-center justify-center gap-2 group ${buttonClasses}`}
          >
            {btnText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </Link>
      ) : (
        <Button
          className={`py-4 px-8 rounded-full transition duration-300 flex items-center justify-center gap-2 group ${buttonClasses}`}
          onClick={handleClick}
        >
          {btnText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      )}

      {/* Only render the form dialog if `withForm` is true */}
      {withForm && (
        <Dialog
          size="md"
          open={open}
          handler={() => setOpen(false)}
          className={`bg-transparent shadow-none ${dialogClasses}`} // Use custom dialog classes
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" className="text-brown-200">
                {formFields.title}
              </Typography>
              <Typography className="mb-3 font-normal text-brown-100" variant="paragraph">
                {formFields.description}
              </Typography>
              
              <Input label={formFields.NamePlaceHolder} size="lg" />
              <Input label={formFields.EmailPlaceholder} size="lg" />
              <Input label={formFields.PhoneNumberPlaceHolder} size="lg" />
              
              <Typography className="text-brown-300" variant="h6">
                {formFields.Service}
              </Typography>
              <Select
                label="Choose Procedure"
                onChange={(value) => handleServiceChange(value)}
              >
                <Option value="Dental Checkup">Dental Checkup</Option>
                <Option value="Teeth Whitening">Teeth Whitening</Option>
                <Option value="Orthodontics">Orthodontics</Option>
                <Option value="Cosmetic Dentistry">Cosmetic Dentistry</Option>
                <Option value="Gum Disease">Gum Disease</Option>
                <Option value="Cavity">Cavity</Option>
                <Option value="Braces">Braces</Option>
                <Option value="Root Canal">Root Canal</Option>
              </Select>
            </CardBody>

            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                className="bg-brown-50 text-brown-50"
                onClick={() => {
                  console.log("Selected Service:", selectedService);
                  setOpen(false);
                }}
                fullWidth
              >
                {formFields.submitText}
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      )}
    </>
  );
}
