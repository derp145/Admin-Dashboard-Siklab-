// SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Auth.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendResetLink = async () => {
    if (!forgotEmail.includes("@")) return setModalError("Enter a valid email");
    setModalError("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: window.location.origin + "/auth/new-password", // points to NewPass page
      });
      if (error) setModalError(error.message);
      else setModalSuccess(true);
    } catch {
      setModalError("Something went wrong. Try again.");
    }
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
          <h2>Welcome back Admin!</h2>
          <p>Secure access for administrators only</p>

          {error && <div className="error-text">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className={`primary-btn ${loading ? "loading-btn" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: "12px", fontSize: "12px", color: "#cbd5e1" }}>
            <button className="link-btn" onClick={() => setShowForgotModal(true)}>
              Forgot Password?
            </button>
            <div>We’ll send a reset link to your email.</div>
          </div>

          <p style={{ marginTop: "24px" }}>
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="link-btn">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Forgot password modal */}
        {showForgotModal && (
          <div className="modal-overlay-small">
            <div className="modal-glass-small">
              <h3>Reset Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              {modalError && <p style={{ color: "red" }}>{modalError}</p>}
              {modalSuccess && (
                <p style={{ color: "#fbbf59" }}>
                  Check your email! Click the link to set your new password.
                </p>
              )}
              {!modalSuccess && (
                <button className="primary-btn full-width" onClick={sendResetLink}>
                  Send Reset Link
                </button>
              )}
              <button
                className="link-btn full-width"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotEmail("");
                  setModalError("");
                  setModalSuccess(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
