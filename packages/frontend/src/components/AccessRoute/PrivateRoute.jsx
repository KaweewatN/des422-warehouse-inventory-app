import React from "react";
import {Navigate} from "react-router-dom";
import apiService from "../../service/apiService";

const PrivateRoute = ({children}) => {
  const isAuthenticated = apiService.isLogin();

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
