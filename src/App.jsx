import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./auth/AuthRoute";
import PageRoute from "./pages/PageRoute";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/auth/*" element={<AuthRoute />} />

      {/* Dashboard */}
      <Route path="/dashboard/*" element={<PageRoute />} />

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/auth/signin" />} />
    </Routes>
  );
}

export default App;