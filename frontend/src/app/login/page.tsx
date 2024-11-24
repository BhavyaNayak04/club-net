"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Validation schema using zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({}); // State to store errors
  const [loading, setLoading] = useState(false); // Loading state to disable submit while fetching

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the form inputs using zod
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0],
        password: fieldErrors.password?._errors[0],
      });
      return;
    }

    // Clear previous errors if validation passes
    setErrors({});

    // Construct credentials to send to the API
    const credentials = {
      email,
      password,
    };

    try {
      setLoading(true); // Set loading state to true during fetch
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      // Handle API response
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful!");

        // Store token in localStorage or cookies (for example)
        localStorage.setItem("authToken", data.token);  // Assuming API returns a token

        // Redirect to profile or dashboard page
        window.location.href = "/profile"; // Adjust based on your app's routing
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);

        // Set error message for login failure
        setErrors({ email: errorData.message || "Invalid credentials" });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrors({ email: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login to Club</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}





/*"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0],
        password: fieldErrors.password?._errors[0],
      });
      return;
    }
    const credentials = {
            email,
            password
        };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful!");
        // Handle redirection or token storage here
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        setErrors({ email: errorData.message || "Invalid credentials" });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrors({ email: "An unexpected error occurred. Please try again." });
    }
  };


  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login to Club</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
*/