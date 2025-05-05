import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import {useLocation} from "react-router-dom";
import {Provider as ChakraProvider} from "./components/chakra-ui/provider";
import {Provider as ReduxProvider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Store, {persistor} from "./utils/redux/store";

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
import WithDrawHistory from "./pages/admin/withdraw-history/WithDrawHistory";
import Users from "./pages/admin/users/Users";
import Items from "./pages/admin/items/Items";
import ItemTypes from "./pages/admin/item-types/ItemTypes";

const Index = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && <NavbarMenu />}
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
        <Route
          path="/admin/withdraw-history"
          element={
            <AdminRoute>
              <SidebarMenu userRole="admin">
                <WithDrawHistory />
              </SidebarMenu>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <SidebarMenu userRole="admin">
                <Users />
              </SidebarMenu>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/items"
          element={
            <AdminRoute>
              <SidebarMenu userRole="admin">
                <Items />
              </SidebarMenu>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/item-types"
          element={
            <AdminRoute>
              <SidebarMenu userRole="admin">
                <ItemTypes />
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
    <ReduxProvider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>,
);

reportWebVitals();
