import React from "react";
import {LuChevronsRight, LuChevronsLeft} from "react-icons/lu";
import {Box} from "@chakra-ui/react";
import {useLocation} from "react-router-dom"; // Import useLocation
// api service
import apiService from "../../service/apiService";

const Sidebar = ({isCollapsed, toggleSidebar, rolePage}) => {
  const location = useLocation(); // Get the current URL path
  const currentPath = location.pathname; // Extract the current path

  const handleLogout = async () => {
    try {
      await apiService.logout();
      window.location.href = "/auth";
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="0">
        <button
          className="toggle-button"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            margin: "0",
          }}
        >
          {isCollapsed ? <LuChevronsRight size="24" /> : <LuChevronsLeft size="24" />}
        </button>
      </Box>

      <nav className="sidebar-nav">
        <ul className="menu-items">
          {rolePage.navigation.slice(0, -1).map((item) => (
            <li
              key={item.path}
              className={currentPath === item.path ? "active" : ""} // Highlight active item
            >
              <a href={item.path}>
                <span className="icon">{item.icon}</span>
                <span className="text">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="logout-item">
          <li>
            <a
              href={rolePage.navigation[rolePage.navigation.length - 1].path}
              onClick={handleLogout}
            >
              <span className="icon">
                {rolePage.navigation[rolePage.navigation.length - 1].icon}
              </span>
              <span className="text">
                {rolePage.navigation[rolePage.navigation.length - 1].label}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
