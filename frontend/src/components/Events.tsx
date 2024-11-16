"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: string;
  name: string;
  description: string;
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
      <h3>Hi! see all the events here!</h3>
      <main className="w-full flex flex-col justify-center items-center space-y-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {events.map((event) => (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="text-justify flex items-center flex-col justify-start space-y-5"
              >
                <Image
                  src={"/file.svg"}
                  alt={event.name}
                  width={200}
                  height={200}
                />
                <div>
                  <h3 className="text-xl">{event.name}</h3>
                  <p>{event.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
