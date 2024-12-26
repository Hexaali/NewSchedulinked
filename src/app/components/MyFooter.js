"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from "next/image";

export function MyFooter() {
  return (
    <footer className="w-full bg-brown-100 p-8 dark:bg-gray-700">
      <div className="flex flex-col md:flex-row ">
        <div className="flex flex-row mr-2 md:items-start md:flex-1 ">
          <Image
            src="/7oaks/logo.png"
            alt="Logo Image"
            className="h-40 w-40"
            width={20}
            height={20}
          />
          <Typography
            variant="small"
            className="absolute left-[100px] font-alexBrush text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brown-200 pt-16 pl-24">
            7 Oaks Dental
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-md mt-8 md:mt-0" data-aos="fade-up" data-aos-duration="3000">
          <div className="flex items-start space-x-4 p-4 rounded-lg">
            <div className="w-10 h-10 bg-cover pl-2" style={{ backgroundImage: "url(/7oaks/location.svg)" }}></div>
            <div className="text-sm md:text-xs">
              <p className="text-brown-200">
                <span className="font-bold text-white">7 Oaks Dental</span><br />
                140, Main Boulevard<br />
                DHA Phase 6<br />
                Lahore
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-lg ">
            <div className="w-10 h-10 bg-cover pr-10" style={{ backgroundImage: "url(/7oaks/clock.svg)" }}></div>
            <div className="text-sm md:text-xs">
              <p className="text-brown-200 whitespace-nowrap">
                <span className="font-semibold text-white">Mon & Fri:</span> 8am – 5pm<br />
                <span className="font-semibold text-white ">Tue to Thu:</span> 7.30am – 7pm<br />
                <span className="font-semibold text-white">Sat:</span> 9am – 4pm
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-lg">
            <div className="w-10 h-10 bg-cover pr-10" style={{ backgroundImage: "url(/7oaks/phn.svg)" }}></div>
            <div className="text-sm md:text-xs">
              <p>
                <span className="font-semibold text-white">Phone:</span> <a href="tel:+92 3414114142" className="text-brown-200  hover:underline">+92 3414114142</a><br />
                <span className="font-semibold text-white">Email: </span><a href="Manuella7708@gmail.com" className="text-brown-200 hover:underline">Manuella7708@gmail.com</a>
              </p>
            </div>
          </div>
          {/* <div className="flex items-start space-x-2 p-4 rounded-lg ">
            <div className="w-10 h-10 bg-cover pl-2 text-white" style={{ backgroundImage: "url(/7oaks/calendar.svg)" }}></div>
            <div className="text-sm md:text-xs pt-3">
              <p>
                <a href="" className="text-brown-200 font-semibold hover:text-brown-50 hover:underline pl-2">Book Appointment</a>
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <div className="flex flex-row items-center justify-center space-x-8" >
        <Typography color="blue-gray" className="text-center font-normal text-brown-200 ">
          &copy; 2024<span className="pl-4 text-brown-200">7 Oaks Dental</span>
        </Typography>
        <div className="flex justify-center gap-4">
          <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600 transition-colors">
            <FaFacebookF className="text-2xl" />
          </a>
          <a href="https://twitter.com" className="text-gray-600 hover:text-blue-400 transition-colors">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://instagram.com" className="text-gray-600 hover:text-pink-500 transition-colors">
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
