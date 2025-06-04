import React from "react";
import Image from "next/image";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
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

      {/* Large screens layout (unchanged) */}
      <div className="hidden sm:flex items-center justify-between text-sm text-gray-600 sm:text-xs flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          {eventDateTime && (
            <>
              <div className="flex items-center gap-1">
                <CalendarDaysIcon className="w-4 h-4 text-green-600" />
                <span>{dateString}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4 text-green-600" />
                <span>{timeString}</span>
              </div>
            </>
          )}

          {event.location && (
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {event.category && (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs whitespace-nowrap">
            {event.category}
          </span>
        )}
      </div>

      {/* Small screen layout */}
      <div className="flex flex-col sm:hidden gap-1 mt-2">
        <div className="flex justify-between text-[11px] text-gray-700 font-medium">
          {eventDateTime && (
            <>
              <div className="flex items-center gap-1">
                <CalendarDaysIcon className="w-4 h-4 text-green-600" />
                <span>{dateString}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4 text-green-600" />
                <span>{timeString}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 text-[10px] text-gray-600">
          {event.location && (
            <div className="flex items-center gap-1 max-w-[100px] truncate">
              <span>📍</span>
              <span>{event.location}</span>
            </div>
          )}
          {event.category && (
            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px]">
              {event.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
