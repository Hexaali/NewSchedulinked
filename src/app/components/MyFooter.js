"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export function MyFooter() {
  return (
    <footer className="w-full bg-brown-100 p-8 dark:bg-gray-700 ">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Logo and Branding */}
        <div className="flex flex-row pr-10 pl-6 md:flex-1 lg:pt-8">
          <Image
            src="/logo.png"
            alt="Logo Image"
            className="h-40 w-40"
            width={20}
            height={20}
          />
          <Typography
            variant="small"
            className="absolute left-[130px] font-alexBrush text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brown-200 pt-16 pl-24"
          >
            7 Oaks Dental
          </Typography>
        </div>

        {/* Info Cards Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8 md:mt-0"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          {/* Location */}
          <div className="flex flex-col items-center bg-transparent p-6 rounded-lg">
            <div
              className="w-14 h-14 bg-cover"
              style={{
                backgroundImage: "url(/location.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <Typography
              variant="h6"
              className="text-white mt-4 text-center font-semibold"
            >
              Location
            </Typography>
            <Typography
              variant="small"
              className="text-gray-300 text-center mt-2"
            >
              <span className="font-bold">7 Oaks Dental</span>
              <br />
              140, Main Boulevard
              <br />
              DHA Phase 6
              <br />
              Lahore
            </Typography>
          </div>

          {/* Clock */}
          <div className="flex flex-col items-center bg-transparent p-6 rounded-lg">
            <div
              className="w-14 h-14 bg-cover"
              style={{
                backgroundImage: "url(/clock.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <Typography
              variant="h6"
              className="text-white mt-4 text-center font-semibold"
            >
              Hours
            </Typography>
            <Typography
              variant="small"
              className="text-gray-300 text-center mt-2 whitespace-nowrap"
            >
              <span className="font-semibold">Mon & Fri:</span> 8am – 5pm
              <br />
              <span className="font-semibold">Tue to Thu:</span> 7.30am – 7pm
              <br />
              <span className="font-semibold">Sat:</span> 9am – 4pm
            </Typography>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center bg-transparent p-6 rounded-lg">
            <div
              className="w-14 h-14 bg-cover"
              style={{
                backgroundImage: "url(/phn.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <Typography
              variant="h6"
              className="text-white mt-4 text-center font-semibold"
            >
              Contact
            </Typography>
            <Typography
              variant="small"
              className="text-gray-300 text-center mt-2"
            >
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+92 3414114142"
                className="text-blue-400 hover:underline"
              >
                +92 3414114142
              </a>
              <br />
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:hello@7oaksdental.com"
                className="text-blue-400 hover:underline"
              >
                hello@7oaksdental.com
              </a>
            </Typography>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className="my-8 border-blue-gray-50" />
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <Typography
          color="blue-gray"
          className="text-center font-normal text-brown-200"
        >
          &copy; 2024 <span className="pl-4 text-brown-200">7 Oaks Dental</span>
        </Typography>
        <div className="flex justify-center gap-4">
          <a
            href="https://facebook.com"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaFacebookF className="text-2xl" />
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-600 hover:text-blue-400 transition-colors"
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-600 hover:text-pink-500 transition-colors"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
