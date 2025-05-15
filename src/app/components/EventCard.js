"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  CalendarDaysIcon,
  ClockIcon,
  LinkIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { Typography, Spinner } from "@material-tailwind/react";

// ✅ Reusable component for displaying icon + text
const InfoRow = ({ icon: Icon, text, className = "" }) => (
  <div className={`flex items-center gap-2 text-sm lg:text-base ${className}`}>
    <Icon className="h-4 w-4 lg:h-5 lg:w-5 text-green-700" />
    <span>{text}</span>
  </div>
);

export const EventCard = React.memo(function EventCard({ event }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  useEffect(() => {
    // Log only once after parsing
    if (user) console.log("User Data", user);
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center p-6">
        <Spinner className="h-20 w-20 text-yellow-600/50" />
      </div>
    );
  }

  const eventImage = event.image ?? "/default-event.jpg";
  const profileImage = user.image ?? "/default-profile.png";
  const username = user.username ?? "Unknown User";

  return (
    <div className="w-full max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border m-2 bg-gradient-to-tr from-yellow-400 to-green-500">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 bg-gradient-to-tr from-yellow-400 to-green-500">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-green-400 shadow-md">
            <Image
              src={profileImage}
              alt={username}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 48px, 56px"
            />
          </div>
          <span className="font-semibold text-gray-800 dark:text-white">{username}</span>
        </div>
      </div>

      {/* Event Image */}
      <div className="w-full aspect-video relative">
        <Image
          src={eventImage}
          alt={event.title ?? "Event Image"}
          fill
          className="object-fill"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 800px, 1200px"
        />
      </div>

      {/* Event Details */}
      <div className="px-6 py-1 lg:space-y-2">
        {event.title && (
          <Typography variant="h6" className="text-lg lg:text-xl text-green-300 font-bold">
            {event.title}
          </Typography>
        )}

        {event.description && (
          <Typography className="text-sm lg:text-base text-gray-600">{event.description}</Typography>
        )}

        {event.datetime && (
          <InfoRow
            icon={CalendarDaysIcon}
            text={new Date(event.datetime).toLocaleString()}
            className="text-green-300"
          />
        )}

        {event.duration && (
          <InfoRow icon={ClockIcon} text={event.duration} className="text-green-300" />
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

        {event.attachment?.name && (
          <InfoRow icon={PaperClipIcon} text={event.attachment.name} className="text-gray-600" />
        )}
      </div>
    </div>
  );
});
