import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPass";
import NewPass from "./NewPass"; // renamed ResetPassword to NewPass

export default function AuthRoute() {
  const { session } = useAuth();

  // If logged in, redirect to dashboard
  if (session) return <Navigate to="/dashboard" />;

  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<NewPass />} />
    </Routes>
  );
}
