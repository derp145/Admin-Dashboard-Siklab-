import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./auth/AuthRoute";
import PageRoute from "./pages/PageRoute";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthRoute />} />

      {/* Dashboard Routes - protected */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <PageRoute />
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/auth/signin" />} />
    </Routes>
  );
}

export default App;
