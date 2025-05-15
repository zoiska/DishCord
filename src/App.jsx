import RecipeBrowser from "./pages/RecipeBrowser/RecipeBrowser.jsx";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import BottomNav from "./components/BottomNav/BottomNav.jsx";


import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";


function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/recipe-browser" element={<RecipeBrowser />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </>
  );
}

export default App;
