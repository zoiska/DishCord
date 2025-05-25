import { useNavigate } from "react-router-dom";
import "./Home.css";
import dishcordLogo from "../../assets/logo.png";
import { useAuth } from "../../authContext.jsx";

function Home() {
  const navigate = useNavigate();
  let { isAuthenticated, setIsAuthenticated } = useAuth();
  let showSignInButton = !isAuthenticated;
  let showLogoutButton = isAuthenticated;

  function toLogin() {
    navigate("/login");
  }

  function logoutToLogin() {
    setIsAuthenticated(false);
    localStorage.removeItem("t");
    navigate("/login");
  }

  return (
    <>
      {showSignInButton && (
        <button id="signInButton" onClick={toLogin}>
          Sign In
        </button>
      )}
      {showLogoutButton && (
        <button id="logoutButton" onClick={logoutToLogin}>
          Logout
        </button>
      )}
      <div className="home-wrapper">
        <img src={dishcordLogo} className="home-logo" alt="DishCord logo" />
        <h1>DishCord</h1>
      </div>
    </>
  );
}

export default Home;
