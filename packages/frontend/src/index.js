import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <NavbarMenu userName="John Doe" userAvatar="https://via.placeholder.com/150" />
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
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
