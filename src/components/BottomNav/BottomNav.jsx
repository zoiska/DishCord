import "./BottomNav.css";
import { NavLink } from "react-router-dom";
import { Home, Search, User } from "lucide-react";

function BottomNav() {
  return (
    <div className="bottom-nav">
      <NavLink to="/recipe-browser" className="nav-link">
        <Search size={32} />
      </NavLink>
      <NavLink to="/" className="nav-link">
        <Home size={32} />
      </NavLink>
      <NavLink to="/profile" className="nav-link">
        <User size={32} />
      </NavLink>
    </div>
  );
}

export default BottomNav;
