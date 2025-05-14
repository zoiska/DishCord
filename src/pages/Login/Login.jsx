import { useNavigate } from "react-router-dom";
import "./Login.css";

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

    const res = await fetch("http://localhost:3000/auth/login", {
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
  }

  async function guestClicked() {
    console.log("Big things coming soon ...");
  }

  return (
    <>
      <div className="loginWrapper">
        <input className="username" placeholder="Enter username" type="text" />
        <input
          className="password"
          placeholder="Enter password"
          type="password"
          onKeyDown={handleEnter}
        />
        <button className="loginButton" onClick={loginClicked}>
          Login
        </button>

        <button className="guestButton" onClick={guestClicked}>
          Or continue as Guest
        </button>
      </div>
    </>
  );
}
