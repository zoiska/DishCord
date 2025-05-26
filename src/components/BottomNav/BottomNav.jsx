import "./BottomNav.css";
import { Home, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

function BottomNav() {
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <div className="bottom-nav">
      <NavLink to="/recipe-browser" className={linkClass}>
        <Search size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
      </NavLink>
      <NavLink to="/" className={linkClass}>
        <Home size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        <User size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
      </NavLink>
    </div>
  );
}

export default BottomNav;
