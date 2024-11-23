import { Navigate } from "react-router-dom";
import { useAuthContext } from "./Authcontext";

const ProtectedRoute = ({ roleRequired, children }) => {
  const { authUser } = useAuthContext();

  // If the user is not authenticated, redirect to the login page
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role doesn't match the required role, redirect based on their role
  if (authUser.role !== roleRequired) {
    return <Navigate to={`/${authUser.role === "admin" ? "admin" : authUser.role === "peon" ? "peonhome" : "home"}`} replace />;
  }

  // If everything is okay, render the children (protected route content)
  return children;
};

export default ProtectedRoute;
