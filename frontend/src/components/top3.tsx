"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { set } from "react-hook-form";
import Loading from "./ui/loading";
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
export default function top3() {
  const [top3Clubs, setTop3Clubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchTop3Clubs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/clubs/top-clubs"
        );
        const data = await response.json();
        setLoading(false);
        setTop3Clubs(data);
      } catch (error) {
        console.error("Error fetching top 3 clubs:", error);
      }
    };

    fetchTop3Clubs();
  }, []);
  return (
    <section className="flex items-center justify-between space-x-5">
      <div className="text-5xl font-bold text-center space-y-1">
        <p>T</p>
        <p>O</p>
        <p>P</p>
        <p>-</p>
        <p>3</p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center justify-center text-center  text-sm">
          {top3Clubs.map((club) => (
            <div
              className="flex flex-col items-center justify-center space-y-2 p-5 rounded-3xl h-72"
              key={club.clubId}
            >
              <div className="p-10 rounded-full overflow-hidden">
                <Image
                  src={club.logo}
                  alt={club.clubName}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
              <p>{club.clubName}</p>
              <p>{club.category}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
