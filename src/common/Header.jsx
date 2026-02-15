import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    displayName: "",
    profileImage: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser) setUser(storedUser);

    // Listen for profile updates
    const updateHandler = () => {
      const updatedUser = JSON.parse(localStorage.getItem("userProfile"));
      if (updatedUser) setUser(updatedUser);
    };

    window.addEventListener("profileUpdated", updateHandler);
    return () => window.removeEventListener("profileUpdated", updateHandler);
  }, []);

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  const initials = user.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="header">
      <div className="header-left">
        <h3>Commander Interface</h3>
        <p>Real-time platform monitoring and management</p>
      </div>

      <div className="header-right">
        {/* Search */}
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search data..." className="search-input" />
        </div>

        {/* Notification */}
        <div className="notification-wrapper">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </div>

        {/* Profile */}
        <div className="profile-wrapper" onClick={handleProfileClick}>
          {user.profileImage ? (
            <img src={user.profileImage} alt="avatar" className="header-avatar-img" />
          ) : (
            <div className="avatar">{initials}</div>
          )}
          <div className="profile-text">
            <span className="profile-name">{user.displayName || "User"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;