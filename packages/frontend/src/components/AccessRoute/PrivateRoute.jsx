import {Navigate, useLocation} from "react-router-dom";
import apiService from "../../service/apiService";

const PrivateRoute = ({children}) => {
  const isAuthenticated = apiService.isLogin();
  const userRole = apiService.getUserRole();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (userRole === "admin" && location.pathname !== "/profile") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
