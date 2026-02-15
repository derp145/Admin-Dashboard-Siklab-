// NewPass.jsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import "./Auth.css";

export default function NewPass() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const access_token = searchParams.get("access_token");

  useEffect(() => {
    if (!access_token) {
      setError("Invalid or expired link. Please request a new password reset.");
    }
  }, [access_token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);

    try {
      // Pass the recovery token in the headers for password update
      const { error } = await supabase.auth.updateUser(
        { password },
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      if (error) setError(error.message);
      else setShowSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-right">
          <h2>Set New Password</h2>
          <p className="subtitle">Enter your new password and confirm it below</p>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button type="submit" className="primary-btn full-width" disabled={loading}>
              {loading ? "Submitting..." : "Change Password"}
            </button>
          </form>

          {showSuccess && (
            <div className="modal-overlay-small">
              <div className="modal-glass-small">
                <h3>Password Changed!</h3>
                <p>You can now sign in with your new password.</p>
                <button
                  className="primary-btn full-width"
                  onClick={() => navigate("/auth/signin")}
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
