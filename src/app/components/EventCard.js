"use client";

import React from "react";
import Image from "next/image";
import {
  CalendarDaysIcon,
  ClockIcon,
  LinkIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";

export const EventCard = React.memo(function EventCard({ event }) {
  const userData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  if (!userData) return null;

  const fullName = userData.full_name ?? "Unknown User";
  const profileImage = userData.profile_picture ?? "/default-profile.png";
  const username = userData.username ?? "invalid-user";

  const eventDateTime = event.time ? new Date(event.time) : null;
  const dateString = eventDateTime?.toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
  const timeString = eventDateTime?.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  let formattedDuration = null;
  if (event.duration) {
    const parts = event.duration.split(" ");
    formattedDuration = parts.length === 2 ? parts[1] : parts[0];
  }

  return (
    <div className="w-full max-w-2xl lg:max-w-3xl mx-auto bg-white rounded-xl border shadow-sm hover:shadow-md transition m-2 px-4 py-3">
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

      <div className="mb-4 space-y-2">
        {event.title && (
          <Typography variant="h6" className="text-lg font-bold text-gray-800">
            {event.title}
          </Typography>
        )}
        {event.description && (
          <Typography className="text-sm text-gray-700">
            {event.description}
          </Typography>
        )}
      </div>

      {/* Main event info row */}
      <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-gray-600">
        <div className="flex flex-wrap items-center gap-6">
          {eventDateTime && (
            <>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <CalendarDaysIcon className="w-4 h-4 text-green-600" />
                <span>{dateString}</span>
              </div>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <ClockIcon className="w-4 h-4 text-green-600" />
                <span>{timeString}</span>
              </div>
            </>
          )}

          {event.location && (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span>📍</span>
              <span>{event.location}</span>
            </div>
          )}

          {formattedDuration && (
            <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
              ⏱ {formattedDuration}
            </span>
          )}
        </div>

        {event.category && (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs whitespace-nowrap ml-auto">
            {event.category}
          </span>
        )}
      </div>
    </div>
  );
});
