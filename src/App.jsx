import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import { useAuth } from "./contexts/authContext.jsx";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import RandomRecipe from "./pages/RandomRecipe/RandomRecipe.jsx";
import RecipeBrowser from "./pages/RecipeBrowser/RecipeBrowser.jsx";
import Register from "./pages/Register/Register.jsx";
import "./App.css";

function App() {
  let { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();
  const hideNav =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/create-recipe" ||
    location.pathname === "/random";

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
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/random" element={<RandomRecipe />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </div>
  );
}

export default App;
