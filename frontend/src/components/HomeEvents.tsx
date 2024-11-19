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
      <h3></h3>
      <main className="w-full flex flex-col justify-center items-center space-y-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mx-auto space-y-8">
            {events.slice(0, 3).map((event, index) => (
              <Link
                href={`/events/${event.eventId}`}
                key={index}
                className={`text-justify flex items-center ${
                  event.eventId % 2 === 0 ? "flex-row-reverse" : ""
                } justify-between modecard p-5 rounded-3xl h-72`}
              >
                <Image
                  src={event.banner}
                  alt={event.eventName}
                  width={350}
                  height={350}
                  className="object-cover"
                />
                <div className="flex flex-col justify-center items-start space-y-3 p-8">
                  <h3 className="text-xl">{event.eventName}</h3>
                  <p className="line-clamp-6">{event.description}</p>
                  <p>{event.dateAndTime}</p>
                  <p>{event.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
