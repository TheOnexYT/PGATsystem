
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

export const ProtectedRoute = ({ allowedRoles = [] }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified but user doesn't have any of the allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render the children
  return <Outlet />;
};

export default ProtectedRoute;
