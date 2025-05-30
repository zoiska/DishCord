import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./authContext.jsx";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import CreateRecepieButton from "./components/CreateRecepieButton/CreateRecepieButton.jsx"; // Import the CreateRecepieButton component
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import RecipeBrowser from "./pages/RecipeBrowser/RecipeBrowser.jsx";
import Register from "./pages/Register/Register.jsx";
import CreateRecepie from "./pages/CreateRecepie/CreateRecepie.jsx"; // Import the CreateRecepie page
import "./App.css";

function App() {
  let { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();
  const hideNav =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/create-recipe";

  return (
    <div className="app">
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
        <Route path="/create-recipe" element={<CreateRecepie />} />
      </Routes>

      {!hideNav && <CreateRecepieButton />}

      {!hideNav && <BottomNav />}
    </div>
  );
}

export default App;
