import "./BottomNav.css";
import { Home, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

function BottomNav() {
  return (
    <div className="bottom-nav">
      <NavLink to="/recipe-browser">
        <Search size={32} color="#7e64ff" absoluteStrokeWidth={1} />
      </NavLink>
      <NavLink to="/">
        <Home size={32} color="#7e64ff" absoluteStrokeWidth={1} />
      </NavLink>
      <NavLink to="/profile">
        <User size={32} color="#7e64ff" absoluteStrokeWidth={1} />
      </NavLink>
    </div>
  );
}

export default BottomNav;
