import React, { useState, useEffect } from "react";
import "./DashboardPage.css";
import JobSearch from "../../component/JobSearch";
import { authApi } from "../../api/auth.api";

export default function DashboardPage({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [name, setName] = useState("Loading...");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const username = localStorage.getItem("loggedInUser");
      console.log(`Username: ${username}`);

      if (username) {
        try {
          const response = await authApi.user(username);

          if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
          }
          const user = await response.json();
          console.log(`User profile: ${JSON.stringify(user, null, 2)}`);
          const firstName = user?.firstName || "";
          const lastName = user?.lastName || "";

          if (firstName || lastName) {
            setName(`${firstName} ${lastName}`);
          } else {
            setName("Guest User");
          }
        } catch (error) {
          console.error("Failed to load user profile:", error);
          setName("Guest User");
        }
      } else {
        setName("Guest User");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  }

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  }

  useEffect(() => {
    const closeDropdownGlobal = () => setIsProfileDropdownOpen(false);
    window.addEventListener("click", closeDropdownGlobal);
    return () => window.removeEventListener("click", closeDropdownGlobal);
  }, []);

  // RENDERING CONTROLLER FOR MULTIPLE VIEWS
  const renderContentView = () => {
    switch (activeTab) {
      case "job-search":
        return <JobSearch />;
      case "dashboard":
      default:
        // Fall back to children components (like UploadScreen) if provided
        return children || <div className="placeholder-view">Welcome to your Dashboard View</div>;
    }
  };

  return (
    <div className="portal-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className={`portal-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-brand">
          <div className="brand-logo-circle">JL</div>
          <span className="brand-name">JobLink</span>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-group top-group">
            <button
              className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <span className="menu-text">Dashboard</span>
            </button>

            <button
              className={`menu-item ${activeTab === "job-search" ? "active" : ""}`}
              onClick={() => setActiveTab("job-search")}
            >
              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              <span className="menu-text">Job Search</span>
            </button>
          </div>

          <div className="menu-group bottom-group">
            <button
              className={`menu-item ${activeTab === "help" ? "active" : ""}`}
              onClick={() => setActiveTab("help")}
            >
              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              <span className="menu-text">Help</span>
            </button>

            <button
              className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              <span className="menu-text">Settings</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* VIEWPORT CONTENT CONTAINER */}
      <div className="portal-main">
        {/* HEADER BAR */}
        <header className="portal-header">
          {/* <button className="hamburger-toggle" onClick={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button> */}
          <button className="hamburger-toggle sidebar-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              /* Collapse Sidebar Icon (Points Left) */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
                <path d="m16 15-3-3 3-3" />
              </svg>
            ) : (
              /* Expand Sidebar Icon (Points Right) */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
                <path d="m13 9 3 3-3 3" />
              </svg>
            )}
          </button>

          <div className="header-actions">
            <button className="notification-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>
            <div className="user-profile-menu-container">
              <div className="user-profile" onClick={toggleProfileDropdown}>
                <span className="user-name">{name}</span>
                <div className="avatar-circle">
                  <svg className={`chevron-indicator ${isProfileDropdownOpen ? "rotated" : ""}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                {isProfileDropdownOpen && (
                  <div className="profile-dropdown-card" onClick={(e) => e.stopPropagation()}>
                    <div className="dropdown-user-info-summary">
                      <div className="summary-title">{name}</div>
                      <div className="summary-subtitle">Authenticated Account</div>
                    </div>

                    <div className="dropdown-divider-line"></div>

                    <button
                      className="dropdown-action-item logout-trigger"
                      type="button"
                      onClick={handleLogout}
                    >
                      <svg className="action-item-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* INJECTED PAGE BODY SLOT */}
        <main className="portal-content-view">
          {renderContentView()}
        </main>
      </div>
    </div>
  );
}