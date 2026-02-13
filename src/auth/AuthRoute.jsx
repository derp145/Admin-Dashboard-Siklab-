import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPass from "./ForgotPass";
import NewPass from "./NewPass";

function AuthRoute() {
  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgot" element={<ForgotPass />} />
      <Route path="new-password" element={<NewPass />} />
    </Routes>
  );
}

export default AuthRoute;