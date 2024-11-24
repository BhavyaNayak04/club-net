"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Loading from "./ui/loading";

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
    return <Loading />;
  }

  return (
    <div className="flex flex-col space-y-6">
      {events.slice(0, 5).map((event) => (
        <Link href={`/events/${event.eventId}`} key={event.eventId}>
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex">
            <Image
              src={event.banner}
              alt={event.eventName}
              width={200}
              height={200}
              className="w-48 h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between  modecard w-full">
              <h3 className="text-xl font-bold">{event.eventName}</h3>
              <p className="text-sm  line-clamp-3">{event.description}</p>
              <p className="text-sm ">
                {new Date(event.dateAndTime).toLocaleString()}
              </p>
              <p className="text-sm ">{event.location}</p>
            </div>
          </div>
        </Link>
      ))}

      <Link href="/events">
        <Button className="mt-6">Explore all events</Button>
      </Link>
    </div>
  );
}
