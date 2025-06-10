import { createContext, useContext, useState, useEffect } from "react";
import { getUserData } from "../services/UserService.js";

const UserDataContext = createContext();

export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState({
    username: "",
    ownRecipes: [],
    likedRecipes: [],
    dislikedRecipes: [],
    favoriteRecipes: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData(setUserData);
    }
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}
