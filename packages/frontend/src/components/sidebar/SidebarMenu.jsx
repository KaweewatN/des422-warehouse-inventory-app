import React, {useState} from "react";
import "./Sidebar.css";
import Sidebar from "./Sidebar";
import {userPage, adminPage} from "./Navigation";

function SidebarMenu({children, userRole}) {
  // State to manage whether the sidebar is collapsed or not
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  // Determine the role-based navigation
  const rolePage = userRole === "admin" ? adminPage : userPage;

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} rolePage={rolePage} />
      <main
        className={`main-content ${isSidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
      >
        {children}
      </main>
    </div>
  );
}

export default SidebarMenu;
