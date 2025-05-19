import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import dishcordLogo from "../../assets/logo.png";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  async function login() {
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      if (res.ok) {
        // TODO: Handle success
        // Store user data in local storage or context
        navigate("/");
      } else {
        // TODO: Handle error (show UI message)
        // "wrong password" or "user not found"
        const error = await res.json();
        console.error(error);
      }
    } catch (error) {
      // TODO: Handle error (show UI message)
      // "Network error" or "Server not reachable" probably
      console.error("Login error:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="wrapper">
      <h1>DishCord</h1>
      <img src={dishcordLogo} className="logo" alt="DishCord logo" />

      <form className="inputContainer" onSubmit={handleSubmit}>
        <input name="username" placeholder="Enter username" type="text" onChange={handleChange} />
        <input
          name="password"
          placeholder="Enter password"
          type="password"
          onChange={handleChange}
        />
        <div className="loginButtons">
          <button type="button" onClick={() => navigate("/register")}>
            Register instead
          </button>
          <button type="submit">Login</button>
        </div>
      </form>
      <span className="guestLink" onClick={() => navigate("/")}>
        Or continue as Guest
      </span>
    </div>
  );
}
