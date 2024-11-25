"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = (sessionId: string, email: string) => {
    Cookies.set("sessionId", sessionId, { expires: 7 });
    Cookies.set("email", email, {
      path: "/",
      expires: 7,
    });

    setIsAuthenticated(true);
  };

  const logout = async () => {
    Cookies.remove("sessionId");
    Cookies.remove("email");
    setIsAuthenticated(false);
    toast.success("Logging you out...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    router.push("/login");
  };

  return { isAuthenticated, setIsAuthenticated, loading, login, logout };
};

export default useAuth;
