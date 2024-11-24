"use client";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const [mode, setMode] = useState("🌞");
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav
      className={`flex flex-row justify-between items-center bg-inherit px-28 py-5 sticky top-0 z-50`}
    >
      <Link href="/" className="text-xl">
        ClubNet
      </Link>
      <div className="flex flex-row text-sm space-between space-x-7 ">
        <Link href={`/clubs`} className="hover:underline">
          Clubs
        </Link>
        <Link href={`/events`} className="hover:underline">
          Events
        </Link>
        <Link href={`/about`} className="hover:underline">
          About
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <button onClick={logout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
        <button
          onClick={() => {
            document.body.classList.toggle("dark");
            setMode(mode === "🌞" ? "🌜" : "🌞");
          }}
        >
          {mode}
        </button>
      </div>
    </nav>
  );
}
