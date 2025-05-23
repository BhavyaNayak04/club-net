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
import Loading from "@/components/ui/loading";

interface Club {
  shortcut: any;
  clubId: string;
  clubName: string;
  description: string;
  category: string;
  logo: string;
  followers: { length: number };
  url: string;
}

export default function Club() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, _] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/clubs");

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
    club.clubName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="content-container space-y-10">
      <Command className="z-0">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Clubs">
            {filteredClubs.map((club, index) => (
              <Link href={`/clubs/${club.clubId}`} key={club.clubId}>
                <CommandItem key={index}>
                  <Image
                    src={club.logo}
                    alt={club.clubName}
                    width={20}
                    height={20}
                  />
                  <span>{club.clubName}</span>
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
          <Loading />
        ) : (
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {clubs.map((club) => (
              <Link
                href={`/clubs/${club.clubId}?`}
                key={club.clubId}
                className="text-pretty text-sm flex items-start flex-col justify-start space-y-5 p-5"
              >
                <Image
                  src={club.logo}
                  alt={club.clubName}
                  width={100}
                  height={100}
                  className="object-cover h-32 w-32 rounded-full"
                />
                <div className="space-y-2 text-xs">
                  <h3 className="font-bold text-sm">{club.clubName}</h3>
                  <p>{club.category}</p>
                  <p>{club.description}</p>
                  <p>{club.followers.length} followers</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </section>
  );
}
