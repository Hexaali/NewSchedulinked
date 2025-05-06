"use client";
// import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventFeed from "../components/EventFeed";
import AddEventButton from "../components/AddEventButton";
import ProfileCard from "../components/ProfileCard";

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

      const res = await fetch("https://schedulinked.kayman.biz/api/v1/event", {
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
    <div className="flex lg:flex-row pt-20 dark:bg-gray-950 dark:bg-black">
  {/* Event Feed Section (Scrollable) */}
  <div className="w-full lg:w-3/5 pt-40 lg:pt-6 p-6 overflow-y-auto flex flex-col items-center mt-2 relative z-10">
    <EventFeed events={events} loading={loading} error={error} />
  </div>

  {/* Profile Card Section (UNCHANGED on mobile, adjusted for desktop) */}
  {user && (
    <div className="fixed top-20 left-0 right-0 z-20 flex justify-center items-start pt-3
                   lg:fixed lg:right-6 lg:top-1/2 lg:left-auto lg:transform lg:-translate-y-1/2 lg:pr-60">
      <ProfileCard user={user} />
    </div>
  )}

  {/* Add Event Button (unchanged) */}
  <div className="fixed bottom-6 right-6 z-50">
    <AddEventButton onNewEvent={handleNewEvent} />
  </div>
</div>



  


  );
}
