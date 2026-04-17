import { Navigate } from "react-router-dom";
const ProtectedRoute = ({
  children,
  allowedRoles,
  userRole,
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};
export default ProtectedRoute;
