"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
    console.log(Cookies.get("email"));
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("sessionId");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
};

export default useAuth;
