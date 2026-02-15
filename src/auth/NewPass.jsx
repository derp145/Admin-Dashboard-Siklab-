import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Auth.css";

export default function NewPass() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) setError(error.message);
      else setShowSuccess(true);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/auth/signin");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-left-overlay">
            <h1 className="siklab-logo">SIKLAB</h1>
          </div>
        </div>

        <div className="auth-right">
          <h2>New Password</h2>
          <p className="subtitle">Enter your new password below</p>
          {error && <div className="error-text">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button
              className={`primary-btn ${loading ? "loading-btn" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Reset Password"}
            </button>
          </form>
        </div>

        {showSuccess && (
          <div className="modal-overlay-small">
            <div className="modal-glass-small">
              <h3>Password Reset Successful!</h3>
              <p>You can now sign in with your new password.</p>
              <div className="modal-buttons">
                <button className="primary-btn" onClick={handleCloseSuccess}>
                  Back to Sign In
                </button>
                <button
                  className="link-btn"
                  onClick={() => setShowSuccess(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
