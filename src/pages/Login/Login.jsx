import { useNavigate } from "react-router-dom";
import "./Login.css";
import dishcordLogo from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  async function handleEnter(e) {
    if (e.key === "Enter") {
      loginClicked();
    }
  }

  async function loginClicked() {
    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;

    if (username === "" || password === "") {
      console.error("Username or password cannot be empty");
      return;
    }

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        navigate("/");
      } else {
        const error = await res.json();
        console.error(error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function guestClicked() {
    navigate("/");
  }

  function toRegister() {
    navigate("/register");
  }

  return (
    <>
      <div className="wrapper">
        <h1>DishCord</h1>

        <img src={dishcordLogo} className="logo" alt="DishCord logo" />
        <div className="inputContainer">
          <input className="username" placeholder="Enter username" type="text" />
          <input
            className="password"
            placeholder="Enter password"
            type="password"
            onKeyDown={handleEnter}
          />
          <div id="loginButtons">
            <button onClick={toRegister}>Register instead</button>
            <button className="loginButton" onClick={loginClicked}>
              Login
            </button>
          </div>
        </div>
        <span className="guestLink" onClick={guestClicked}>
          Or continue as Guest
        </span>
      </div>
    </>
  );
}
