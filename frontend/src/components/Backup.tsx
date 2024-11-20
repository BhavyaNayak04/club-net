"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  eventId: number;
  clubId: number;
  eventName: string;
  description: string;
  banner: string;
  dateAndTime: string;
  location: string;
  entryFee: number;
  teamCapacity: number;
  organizerContactNumber: string;
}

export default function HomeEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/api/events`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="content-container">
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <div className="flex overflow-x-auto space-x-6">
        {events.map((event) => (
          <Link href={`/events/${event.eventId}`} key={event.eventId}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden min-w-[300px]">
              <Image
                src={event.banner}
                alt={event.eventName}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{event.eventName}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {event.description}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(event.dateAndTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{event.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
