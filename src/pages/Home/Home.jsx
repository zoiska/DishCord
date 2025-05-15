import "./Home.css";
import dishcordLogo from "../../assets/logo.png";

function Home() {
  return (
    <>
      <div className="homeContainer">
        <div className="home">
          <img src={dishcordLogo} className="logo" alt="Vite logo" />
          <h1>DishCord</h1>
        </div>
      </div>
    </>
  );
}

export default Home;
