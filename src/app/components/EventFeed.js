"use client";

import React from "react";
import { EventCard } from "./EventCard";
import { Spinner } from "@material-tailwind/react";

const EventFeed = ({ events, loading, error, user }) => {
  if (loading) return (
    <div className="flex justify-center mt-12">
      <Spinner className="w-24 h-24" />
    </div>
  );
  
  if (error) return (
    <div className="text-center py-8">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  );

  return (
   <div className="w-full flex justify-center px-2 sm:px-4 md:px-6 lg:px-12 py-4 lg:py-8">
  <div className="w-full max-w-3xl">
    {events.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">No events found</p>
      </div>
    ) : (
      <div className="grid gap-1 lg:gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} user={user} />
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default EventFeed;