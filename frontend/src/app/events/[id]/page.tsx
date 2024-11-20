"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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

export default function Home() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/api/events/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Event = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (!event) {
    return <p>Event details not found.</p>;
  }

  return (
    <div className="content-container space-y-5 flex items-center justify-center">
      <main className="flex flex-col justify-center items-center space-y-10 text-justify">
        {/* Event Details */}
        <div className="flex flex-col items-center space-y-5">
          <Image
            src={event.banner || "/placeholder-banner.png"}
            alt={event.eventName}
            width={400}
            height={200}
            className="rounded-lg object-cover"
          />
          <h1 className="text-3xl font-bold">{event.eventName}</h1>
          <p className="italic text-gray-600">{event.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center justify-center">
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(event.dateAndTime).toLocaleString()}
            </p>
            <p>
              <strong>Entry Fee:</strong> ${event.entryFee}
            </p>
            <p>
              <strong>Team Capacity:</strong> {event.teamCapacity}
            </p>
            <p>
              <strong>Organizer Contact:</strong> {event.organizerContactNumber}
            </p>
          </div>
        </div>

        {/* Button to Club Details */}
        <h3 className=" font-semibold">Learn More About the Club</h3>
        <Button size={"sm"}>
          <Link href={`/clubs/${event.clubId}`}>Visit Club Page</Link>
        </Button>
      </main>
    </div>
  );
}
