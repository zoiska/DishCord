import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import { AuthCheck } from "./authContext.jsx";

registerSW();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthCheck>
        <App />
      </AuthCheck>
    </BrowserRouter>
  </StrictMode>
);
