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

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const EventCard = React.memo(function EventCard({ event }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  useEffect(() => {
    if (user) console.log("User Data", user);
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center p-6">
        <Spinner className="h-20 w-20 text-yellow-600/50" />
      </div>
    );
  }

  // const eventImage = event.image ?? "/default-event.jpg";
  const fullName = `${capitalize(user?.first_name)} ${capitalize(user?.last_name)}`.trim();
  const profileImage = user.profile_picture ?? "/default-profile.png";
  const username = user.username ?? "Invalid-Username";

  const eventDateTime = event.time ? new Date(event.time) : null;

  const dateString = eventDateTime
    ? eventDateTime.toLocaleDateString(undefined, { dateStyle: "medium" })
    : "";
  const timeString = eventDateTime
    ? eventDateTime.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="w-full max-w-2xl lg:max-w-3xl mx-auto bg-white rounded-xl border shadow-sm hover:shadow-md transition m-2 px-4 py-3">
      {/* Header: profile pic + username + full name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={profileImage}
            alt={username}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-gray-900">{fullName}</span>
          <span className="text-sm text-gray-500">@{username}</span>
        </div>
      </div>

      {/* Event Title and Description */}
      <div className="mb-4 space-y-2">
        {event.title && (
          <Typography variant="h6" className="text-lg font-bold text-gray-800">
            {event.title}
          </Typography>
        )}

        {event.description && (
          <Typography className="text-sm text-gray-700">{event.description}</Typography>
        )}
      </div>

      {/* Bottom info line with date, time, location, duration, category */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
        {/* Date */}
        {eventDateTime && (
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4 text-green-600" />
            <span>{dateString}</span>
          </div>
        )}

        {/* Time */}
        {eventDateTime && (
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4 text-green-600" />
            <span>{timeString}</span>
          </div>
        )}

        {/* Location */}
        {event.location && (
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{event.location}</span>
          </div>
        )}

        {/* Spacer to push category right */}
        <div className="flex-grow"></div>

        {/* Event Category */}
        {event.category && (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs whitespace-nowrap">
            {event.category}
          </span>
        )}
      </div>

      {/* Event Link */}
      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm mt-3"
        >
          <LinkIcon className="h-4 w-4" />
          Visit Link
        </a>
      )}

      {/* Attachment */}
      {event.attachment?.name && (
        <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
          <PaperClipIcon className="w-4 h-4" />
          {event.attachment.name}
        </div>
      )}
    </div>
  );
});
