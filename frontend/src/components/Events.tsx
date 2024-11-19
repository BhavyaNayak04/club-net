"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/events");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="w-full h-full space-y-10">
      <h3>Hi! See all the events here!</h3>
      <main className="w-full flex flex-col justify-center items-center space-y-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event) => (
              <Link
                href={`/events/${event.eventId}`}
                key={`${event.eventId}`}
                className="text-pretty flex items-center flex-col justify-start modecard rounded-lg"
              >
                <Image
                  src={event.banner}
                  alt={event.eventName}
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-square"
                />
                <div className="p-5 space-y-2 text-sm">
                  <h3 className="text-xl">{event.eventName}</h3>
                  <p className="line-clamp-3">{event.description}</p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {event.location ? event.location : "Online"}
                  </p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {new Date(event.dateAndTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>Entry Fee: </strong>
                    {event.entryFee ? `Rs. ${event.entryFee}` : "Free"}
                  </p>
                  <p>
                    <strong>Team Capacity:</strong> {event.teamCapacity}
                  </p>
                  <p>
                    <strong>Contact:</strong> {event.organizerContactNumber}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
