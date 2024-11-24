"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState(""); // To hold the logged-in user's email
  const [followedClubs, setFollowedClubs] = useState<any[]>([]); // To hold followed club details
  const [error, setError] = useState(""); // To handle any error during fetch

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("userEmail");
    if (emailFromStorage) {
      setUserEmail(emailFromStorage);

      // Fetch followed club details using email
      const response= fetch(`http://localhost:8080/api/auth/followed-clubs?email=${emailFromStorage}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch followed clubs.");
          }
          return response.json();
        })
        .then((clubDetails) => {
          setFollowedClubs(clubDetails); // Store club details
        })
        .catch((err) => setError(err.message));
    } else {
      setError("User email not found. Please log in again.");
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Hello, {userEmail || "User"}!</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Followed Clubs</h2>
        {followedClubs.length > 0 ? (
          <ul className="list-disc pl-5">
            {followedClubs.map((club, index) => (
              <li key={index} className="mb-2">
                {club.name} - {club.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You are not following any clubs yet.</p>
        )}
      </div>
    </div>
  );
}
