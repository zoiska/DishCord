import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import dishcordLogo from "../../assets/logo.png";
import { useAuth } from "../../authContext.jsx";
import { login } from "../../services/AuthService.js";

export default function Login() {
  let { setIsAuthenticated } = useAuth();

  const [user, setUser] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "username" && value && value.length >= 4) {
        delete newErrors.username;
      }
      if (name === "password" && value && value.length >= 8) {
        delete newErrors.password;
      }
      return newErrors;
    });
  };

  const navigate = useNavigate();

  async function loginClicked() {
    await login(user, setIsAuthenticated, navigate);
  }

  const validate = () => {
    const errors = {};
    if (!user.username) {
      errors.username = "Username is required";
    } else if (user.username.length < 4) {
      errors.username = "Username must be at least 4 characters";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      loginClicked();
    }
  };

  return (
    <div className="login-wrapper">
      <img src={dishcordLogo} className="logo" alt="DishCord logo" />

      <form className="input-container" onSubmit={handleSubmit} noValidate>
        <h1 className="title sign-in-header">Sign In</h1>
        <input
          className={`login-input ${
            errors.username ? "invalid" : user.username.length >= 4 ? "valid" : ""
          }`}
          type="text"
          name="username"
          required
          minLength="4"
          placeholder="Enter username"
          onChange={handleChange}
        />
        {errors.username && <p className="error-text">{errors.username}</p>}
        <input
          className={`login-input ${
            errors.password ? "invalid" : user.password.length >= 8 ? "valid" : ""
          }`}
          type="password"
          name="password"
          required
          minLength="8"
          placeholder="Enter password"
          onChange={handleChange}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="login-buttons-container">
          <button className="secondary-button" type="button" onClick={() => navigate("/register")}>
            Register instead
          </button>
          <button className="primary-button" type="submit">
            Login
          </button>
        </div>
      </form>
      <span className="guest-link" onClick={() => navigate("/")}>
        Or continue as Guest
      </span>
    </div>
  );
}
