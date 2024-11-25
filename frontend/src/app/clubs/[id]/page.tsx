"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Loading from "@/components/ui/loading";
import { toast } from "react-toastify"; // Import for toasters
import "react-toastify/dist/ReactToastify.css"; // Toast styles

interface Club {
  clubName: string;
  clubId: number;
  category: string;
  description: string;
  url: string;
  logo: string;
  followers: number[];
}
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

export default function ClubDetails() {
  const { id } = useParams();
  const [club, setClub] = useState<Club | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClubDetails = async () => {
      setLoading(true);
      setLoadingEvents(true);

      try {
        const response = await fetch(`http://localhost:8080/api/clubs/${id}`);
        const response2 = await fetch(
          `http://localhost:8080/api/events/club/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Club = await response.json();
        const data2: Event[] = await response2.json();
        setEvents(data2);
        setClub(data);
      } catch (error) {
        console.error("Error fetching club details:", error);
      } finally {
        setLoading(false);
        setLoadingEvents(false);
      }
    };

    if (id) {
      fetchClubDetails();
    }
  }, [id]);

  const handleFollow = async () => {
    const userEmail = Cookies.get("email");

    if (!userEmail) {
      toast.error("User not logged in. Please log in to follow clubs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to follow club");
      }

      toast.success("Club followed successfully!");
    } catch (error) {
      console.error("Error following club:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!club) {
    return <p>Club details not found.</p>;
  }

  return (
    <div className="content-container">
      <main className="flex flex-col justify-center items-center space-y-10 text-justify ">
        <div className="flex flex-col items-center space-y-5 ">
          <Image
            src={club.logo || "/placeholder-logo.png"}
            alt={club.clubName}
            width={200}
            height={200}
            className="w-48 h-48 object-contain"
          />
          <h1 className="text-3xl font-bold">{club.clubName}</h1>
          <div className="flex gap-2">
            <p className="italic">{club.category}</p>
            {" | "}
            <h3 className="italic">{club.followers.length} followers</h3>
          </div>
          <p>{club.description}</p>
          <p>
            <Link href={club.url} target="_blank" rel="noopener noreferrer">
              Visit their website
            </Link>
          </p>
        </div>
        <Button onClick={handleFollow}>Follow</Button>

        <h3 className="text-2xl">Events</h3>
        {loadingEvents ? (
          <p>Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {events.map((event) => (
              <div
                key={event.eventId}
                className="p-5 text-sm border rounded shadow space-y-5"
              >
                <h3 className="text-xl text-center">{event.eventName}</h3>
                <Image
                  src={event.banner}
                  height={200}
                  width={200}
                  alt={event.eventName}
                  className="w-full h-48 object-cover aspect-video"
                />
                <p className="text-center">
                  <Button size={"sm"}>
                    <Link href={`/events/${event.eventId}`}>View Event</Link>
                  </Button>
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
