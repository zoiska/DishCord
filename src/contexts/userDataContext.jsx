import { createContext, useContext, useState } from "react";

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

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}
