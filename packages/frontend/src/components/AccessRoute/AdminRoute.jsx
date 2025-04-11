import React from "react";
import {Navigate} from "react-router-dom";
import apiService from "../../service/apiService";

const AdminRoute = ({children}) => {
  const isAuthenticated = apiService.isLogin();
  const userRole = apiService.getUserRole();

  return isAuthenticated ? (
    userRole === "admin" ? (
      children
    ) : (
      <Navigate to="/unauthorized" replace />
    )
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default AdminRoute;
