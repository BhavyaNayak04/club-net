"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Event {
  eventId: number;
  clubId: number;
  eventName: string;
  description: string;
  banner: string;
  dateAndTime: string;
  location: string | null;
  entryFee: number | null;
  teamCapacity: number;
  organizerContactNumber: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const email = Cookies.get("email");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/admins/get-events/${email}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("An error occurred while fetching events.");
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchEvents();
    }
  }, [email]);

  const handleDelete = async (eventId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setEvents(events.filter((event) => event.eventId !== eventId));
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("An error occurred while deleting the event.");
    }
  };

  const handleUpdate = (eventId: number) => {
    router.push(`/admin/events/update/${eventId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container space-y-4">
      {events.map((event) => (
        <div
          key={event.eventId}
          className="flex justify-between items-end gap-8 p-4 border-b"
        >
          <div>
            <h3 className="text-lg font-bold">{event.eventName}</h3>
            <p className="text-justify">{event.description}</p>
            <p>{new Date(event.dateAndTime).toLocaleString()}</p>
            <p>{event.location || "Location not specified"}</p>
            <p>Team Capacity: {event.teamCapacity}</p>
            <p>Organizer Contact: {event.organizerContactNumber}</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleUpdate(event.eventId)}>Update</Button>
            <Button
              onClick={() => handleDelete(event.eventId)}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
