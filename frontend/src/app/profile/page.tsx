"use client";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import Image from "next/image";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Club {
  clubId: number;
  clubName: string;
  category: string;
  description: string;
  logo: string;
}

export default function Profile() {
  const { isAuthenticated, loading } = useAuth();
  const [followedClubs, setFollowedClubs] = useState<Club[]>([]);
  const [loadingClubs, setLoadingClubs] = useState(true);

  useEffect(() => {
    if (Cookies.get("email")) {
      const fetchFollowedClubs = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/auth/followed-clubs/${Cookies.get(
              "email"
            )}`
          );
          if (!response.ok) {
            toast.error("Error fetching followed clubs");
          }
          const contentType = response.headers.get("content-type");
          let data;
          if (contentType && contentType.includes("application/json")) {
            data = await response.json();
            setFollowedClubs(data);
          } else {
            data = await response.text();
          }
        } catch (error) {
          console.error("Error fetching followed clubs:", error);
        } finally {
          setLoadingClubs(false);
        }
      };

      fetchFollowedClubs();
    }
  }, [Cookies.get("email")]);

  if (loading || !isAuthenticated) {
    return null;
  }

  if (followedClubs.length === 0) {
    return (
      <main className="content-container space-y-10 flex flex-col items-center justify-center">
        <h2 className="text-md">My Clubs</h2>
        <p className="text-center">You are not following any clubs yet.</p>
        <Link href="/clubs">
          <Button>Explore Clubs</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="content-container space-y-10">
      <h2 className="text-md font-bold mb-6">My Clubs</h2>
      {loadingClubs ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {followedClubs.map((club) => (
            <div
              key={club.clubId}
              className="overflow-hidden flex items-center justify-center gap-3"
            >
              <Image
                src={club.logo}
                alt={club.clubName}
                className=" h-12 w-12 object-cover rounded-full"
                width={200}
                height={200}
              />
              <h3 className="text-xs max-w-32 text-center font-bold">
                {club.clubName}
              </h3>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
