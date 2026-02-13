import React from 'react';
import { Search, Bell } from 'lucide-react'; // Import the Bell icon
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h3>Commander Interface</h3>
        <p>Real-time platform monitoring and management</p>
      </div>

      <div className="header-right">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search data..." className="search-input" />
        </div>

        {/* NEW: Notification Bell */}
        <div className="notification-wrapper">
          <Bell size={20} className="bell-icon" />
          <span className="notification-dot"></span>
        </div>

        <div className="avatar">AD</div>
      </div>
    </header>
  );
};

export default Header;