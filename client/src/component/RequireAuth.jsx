import React from "react";
import { useAuth } from "../pages/Auth";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Component to require authentication for accessing certain routes.
 * Redirects to the login page if the user is not authenticated.
 * @param {React.ReactNode} children - The child components to render if the user is authenticated.
 * @returns {React.ReactNode} - Returns the children if the user is authenticated, otherwise redirects to the login page.
 */
export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  // Check if user is authenticated
  if (!auth.user) {
    // Redirect to login page and preserve the current path in state
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  // Render children if user is authenticated
  return children;
};
