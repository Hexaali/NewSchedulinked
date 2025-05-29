"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventFeed from "./EventFeed";
import AddEventButton from "./AddEventButton";
// import ProfileCard from "./ProfileCard";
import { API_BASE_URL } from "@/constants";

export default function Feed() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found. Please log in again.");

      const res = await fetch(`${API_BASE_URL}/api/v1/event`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to fetch events");
      }

      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        router.push("/");
      } else {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          fetchEvents(); // fetch events after setting user
        } catch (error) {
          console.error("Failed to parse user:", error);
          router.push("/");
        }
      }
    }
  }, [router]);

  const handleNewEvent = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  return (
    <div
      className="flex items-center justify-center pt-20 bg-gradient-to-br from-yellow-600 to-green-500 dark:from-gray-900 dark:via-gray-800 dark:to-yellow-600
      transition-all duration-500"
    >
      {/* Event Feed Section (Scrollable) */}
      <div className="w-full lg:w-3/5 lg:pt-6 p-6 overflow-y-auto flex flex-col items-center mt-2 relative z-10">
        {/* ✅ Pass user to EventFeed */}
        <EventFeed events={events} loading={loading} error={error} user={user} />
      </div>

      {/* Optional ProfileCard UI */}
      {/* 
      {user && (
        <div className="fixed top-20 left-0 right-0 z-20 flex justify-center items-start pt-3
                        xl:pr-16 lg:top-1/2 lg:left-auto lg:right-10 lg:transform lg:-translate-y-1/2 lg:justify-end">
          <ProfileCard user={user} />
        </div>
      )} 
      */}

      {/* Add Event Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AddEventButton onNewEvent={handleNewEvent} />
      </div>
    </div>
  );
}
