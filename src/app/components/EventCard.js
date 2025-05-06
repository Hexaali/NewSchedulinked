"use client";

import { Typography, Spinner } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  LinkIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

export function EventCard({ event }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User Data", user);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center p-6">
        <Spinner className="h-20 w-20 text-yellow-600/50" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border m-2 bg-gradient-to-tr from-yellow-400 to-green-500">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 bg-gradient-to-tr from-yellow-400 to-green-500">
        <div className="flex items-center gap-3">
          {/* Profile Picture */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-green-400 shadow-md">
            <Image
              src={user?.image || "/default-profile.png"}
              alt={user?.username || "User Profile"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 48px, 56px"
            />
          </div>
          <span className="font-semibold text-gray-800 dark:text-white">
            {user?.username || "Unknown User"}
          </span>
        </div>
      </div>

      {/* Responsive Image - Wider on lg screens */}
      <div className="w-full aspect-video relative">
        <Image
          src={event.image || "/default-event.jpg"}
          alt={event.title || "Event Image"}
          fill
          className="object-fill"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1200px"
        />
      </div>

      {/* Event Info */}
      <div className="px-6 py-4 lg:space-y-4">
        <Typography variant="h6" className="text-lg lg:text-xl text-green-300 font-bold">
          {event.title}
        </Typography>

        <Typography className="text-sm lg:text-base text-gray-600">
          {event.description}
        </Typography>

        {event.datetime && (
          <div className="flex items-center gap-2 text-sm lg:text-base text-green-300">
            <CalendarDaysIcon className="h-4 w-4 lg:h-5 lg:w-5 text-green-700" />
            <span>{new Date(event.datetime).toLocaleString()}</span>
          </div>
        )}

        {event.duration && (
          <div className="flex items-center gap-2 text-sm lg:text-base text-green-300">
            <ClockIcon className="h-4 w-4 lg:h-5 lg:w-5 text-green-700" />
            <span>{event.duration}</span>
          </div>
        )}

        {event.location && (
          <div className="text-sm lg:text-base text-blue-600 font-medium">
            📍 {event.location}
          </div>
        )}

        {event.category && (
          <div className="text-xs lg:text-sm inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full mt-1">
            {event.category}
          </div>
        )}

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm lg:text-base"
          >
            <LinkIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            Visit Link
          </a>
        )}

        {event.attachment && (
          <div className="flex items-center gap-2 text-sm lg:text-base text-gray-600">
            <PaperClipIcon className="h-4 w-4 lg:h-5 lg:w-5 text-green-700" />
            <span>{event.attachment.name || "Attachment"}</span>
          </div>
        )}
      </div>
    </div>
  );
}