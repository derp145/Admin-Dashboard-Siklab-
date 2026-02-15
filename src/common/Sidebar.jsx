import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Gamepad2,
  Smartphone,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { session } = useAuth(); // reactive to Supabase session
  const [isOpen, setIsOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const modalRef = useRef(null);

  const toggleSidebar = () => setIsOpen((v) => !v);

  // ✅ handle Supabase logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // logs out
      setShowLogoutModal(false);
      navigate("/auth/signin", { replace: true });
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // ✅ close modal on ESC and click outside
  useEffect(() => {
    if (!showLogoutModal) return;

    const onKeyDown = (e) => e.key === "Escape" && setShowLogoutModal(false);
    const onMouseDown = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowLogoutModal(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [showLogoutModal]);

  // ✅ Fully reactive: hide sidebar if no session
  if (!session) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`sidebar-toggle ${!isOpen ? "collapsed" : ""}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <aside className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
        <div className="logo">
          {isOpen ? (
            <>
              Sik<span>Lab</span>
            </>
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

          <NavLink to="/dashboard/settings" className="nav-item">
            <Settings size={22} className="nav-icon" />
            {isOpen && <span className="nav-label">Settings</span>}
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          {isOpen && (
            <button className="upgrade-btn" type="button">
              <Zap size={16} fill="currentColor" /> Upgrade
            </button>
          )}

          <button
            className="logout-btn"
            type="button"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut size={22} className="nav-icon" />
            {isOpen && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card" ref={modalRef}>
            <div className="modal-top">
              <h3 className="modal-title">Log out?</h3>
              <button
                className="modal-close"
                type="button"
                onClick={() => setShowLogoutModal(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="modal-text">
              Are you sure you want to log out of the admin dashboard?
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn ghost"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-btn primary"
                onClick={handleLogout}
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
