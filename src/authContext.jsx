import { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext();

export function AuthCheck({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("t");
      if (token) {
        try {
          const res = await fetch("/auth/status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error checking authentication status:", error);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
      {children}
    </Auth.Provider>
  );
}

export function useAuth() {
  return useContext(Auth);
}
