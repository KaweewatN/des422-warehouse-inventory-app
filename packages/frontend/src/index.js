import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "./components/chakra-ui/provider";
// Routes
import PrivateRoute from "./components/AccessRoute/PrivateRoute";
import AdminRoute from "./components/AccessRoute/AdminRoute";
// files
import "./index.css";
import SidebarMenu from "./components/sidebar/SidebarMenu";
import NavbarMenu from "./components/navbar/NavbarMenu";
// Routes
import Home from "./pages/home/home";
import Auth from "./pages/auth/Auth";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";

const Index = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && (
        <NavbarMenu userName="John Doe" userAvatar="https://via.placeholder.com/150" />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SidebarMenu userRole="user">
                <Home />
              </SidebarMenu>
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <SidebarMenu userRole="admin">
                <AdminDashboard />
              </SidebarMenu>
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
