import { createContext, useContext, useEffect, useState } from "react";
import { checkStatus } from "./services/AuthService";

const Auth = createContext();

export function AuthCheck({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await checkStatus(setIsAuthenticated, setIsLoading);
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
