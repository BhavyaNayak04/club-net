"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      const username = "bhavya123"; // Replace with your actual username
      const password = "0"; // Replace with your actual password
      const credentials = btoa(`${username}:${password}`); // Encode credentials in Base64

      try {
        const response = await fetch("http://localhost:8080/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`, // Set the Authorization header
          },
          credentials: "include", // Include credentials if necessary
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Event[] = await response.json();
        setEvents(data);
        console.log("Parsed data:", data);
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
            {events.slice(0, 3).map((event) => (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className={`text-justify flex items-center ${
                  event.id % 2 === 0 ? "flex-row-reverse" : ""
                } justify-center gap-4 modecard p-5 rounded-3xl h-72`}
              >
                <Image
                  src={
                    "https://img.freepik.com/free-photo/young-activists-taking-action_23-2149502783.jpg?t=st=1731686690~exp=1731690290~hmac=7f2ba687a27b66eaf7d7cb301ca09c1a006049090e42f5d12b556d58ed6ee3a0&w=996"
                  }
                  alt={event.name}
                  width={350}
                  height={350}
                  className="object-cover"
                />
                <div className="flex flex-col justify-center items-start space-y-3 p-8">
                  <h3 className="text-xl">{event.name}</h3>
                  <p className="line-clamp-6">{event.description}</p>
                  <p>{event.date}</p>
                  <p>{event.time}</p>
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
