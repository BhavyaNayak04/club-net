"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

export default function Profile() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return null; // Prevent further rendering while redirecting or loading
  }

  return (
    <div className="content-container min-h-screen flex gap-2 items-center justify-center">
      <div className="">hello</div>
      <div>hello</div>
    </div>
  );
}
