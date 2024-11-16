"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/router";

interface Club {
  shortcut: any;
  id: string;
  name: string;
  description: string;
  image: string;
  members: { length: number };
}

const Page = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);

      const username: string = "bhavya123"; // Replace with your actual username
      const password: string = "0"; // Replace with your actual password
      const credentials: string = btoa(`${username}:${password}`); // Encode credentials in Base64

      try {
        const response = await fetch("http://localhost:8080/api/clubs", {
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

        const data: Club[] = await response.json();
        setClubs(data);
        console.log("Parsed data:", data);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="content-container space-y-10">
      <Command className="z-0">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Clubs">
            {filteredClubs.map((club, index) => (
              <Link href={`/clubs/${club.id}`} key={club.id}>
                <CommandItem key={index}>
                  <Image
                    src={club.image}
                    alt={club.name}
                    width={20}
                    height={20}
                  />
                  <span>{club.name}</span>
                  {club.shortcut && (
                    <CommandShortcut>{club.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <main className="w-full flex flex-col justify-center items-center space-y-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mx-auto grid grid-cols-3 gap-10">
            {clubs.map((club) => (
              <Link
                href={`/clubs/${club.id}`}
                key={club.id}
                className="text-justify flex items-center flex-col justify-center space-y-5"
              >
                <Image
                  src={club.image}
                  alt={club.name}
                  width={200}
                  height={200}
                />
                <div>
                  <h3 className="text-xl">{club.name}</h3>
                  <p>{club.description}</p>
                  <p>{club.members.length} followers</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default Page;
