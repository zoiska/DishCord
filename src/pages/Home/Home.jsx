import { useNavigate } from "react-router-dom";
import "./Home.css";
import dishcordLogo from "../../assets/logo.png";

function Home() {
  const navigate = useNavigate();

  function toLogin() {
    // TODO: only show this if not logged in
    navigate("/login");
  }

  return (
    <>
      <button className="pageSwitchButton" onClick={toLogin}>
        Sign In
      </button>

      <div className="homeContainer">
        <div className="home">
          <img src={dishcordLogo} className="logo" alt="DishCord logo" />
          <h1>DishCord</h1>
        </div>
      </div>
    </>
  );
}

export default Home;
