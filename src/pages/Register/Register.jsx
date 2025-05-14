import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  async function handleEnter(e) {
    if (e.key === "Enter") {
      registerClicked();
    }
  }

  async function registerClicked() {
    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;
    const passwordVerify = document.querySelector(".passwordVerify").value;

    // enforce length?

    if (username === "" || password === "") {
      console.error("Username or password cannot be empty");
      return;
    } else if (password !== passwordVerify) {
      console.error("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:3000/auth/register", {
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

  return (
    <>
      <div>
        <input className="username" placeholder="Enter username" type="text" />
        <input
          className="password"
          placeholder="Enter password"
          type="password"
          onKeyDown={handleEnter}
        />
        <input
          className="passwordVerify"
          placeholder="Verify password"
          type="password"
          onKeyDown={handleEnter}
        />
        <button className="registerButton" onClick={registerClicked}>
          Register
        </button>
      </div>
    </>
  );
}
