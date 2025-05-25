import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./authContext.jsx";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import RecipeBrowser from "./pages/RecipeBrowser/RecipeBrowser.jsx";
import Register from "./pages/Register/Register.jsx";

import "./App.css";

function App() {
  let { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/recipe-browser" element={<RecipeBrowser />} />
        <Route
          path="/profile"
          element={
            isLoading ? (
              <div>Loading...</div>
            ) : isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      {!hideNav && <BottomNav />}
    </>
  );
}

export default App;
