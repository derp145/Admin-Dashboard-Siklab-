import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { session } = useAuth();

  // If no session, redirect to signin
  if (!session) return <Navigate to="/auth/signin" />;

  return children;
}
