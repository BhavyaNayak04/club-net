"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mode, setMode] = useState("🌞");
  return (
    <nav
      className={`flex flex-row justify-between items-center bg-inherit px-28 py-5 sticky top-0 z-50`}
    >
      <Link href="/" className="text-xl">
        ClubNet
      </Link>
      <div className="flex flex-row space-between space-x-7">
        <Link href={`/clubs`}>Clubs</Link>
        <Link href={`/events`}>Events</Link>
        <Link href={`/about`}>About</Link>
        <Link href={`/login`}>Login</Link>
        <Link href={`/profile`}>Profile</Link>

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
