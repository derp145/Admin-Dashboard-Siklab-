import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Gamepad2, 
  Smartphone, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Zap 
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    navigate("/auth/signin", { replace: true });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* The Arrow Toggle Button */}
      <button className={`sidebar-toggle ${!isOpen ? "collapsed" : ""}`} onClick={toggleSidebar}>
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <aside className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
        <div className="logo">
          {isOpen ? (
            <>Sik<span>Lab</span></>
          ) : (
            <span>S.</span>
          )}
        </div>

        <nav className="nav-menu">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <LayoutDashboard size={22} className="nav-icon" />
            {isOpen && <span className="nav-label">Dashboard</span>}
          </NavLink>

          <NavLink to="/dashboard/userinsights" className="nav-item">
            <Users size={22} className="nav-icon" />
            {isOpen && <span className="nav-label">User Insights</span>}
          </NavLink>

          <NavLink to="/dashboard/playerengagement" className="nav-item">
            <Gamepad2 size={22} className="nav-icon" />
            {isOpen && <span className="nav-label">Engagement</span>}
          </NavLink>

          <NavLink to="/dashboard/platformstats" className="nav-item">
            <Smartphone size={22} className="nav-icon" />
            {isOpen && <span className="nav-label">Platform Stats</span>}
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          {isOpen && (
            <button className="upgrade-btn">
              <Zap size={16} fill="currentColor" /> Upgrade
            </button>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={22} className="nav-icon" />
            {isOpen && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;