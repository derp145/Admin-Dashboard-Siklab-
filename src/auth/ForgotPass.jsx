import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Auth.css";

const DEV_MODE = false; // Toggle to false for real email
const DEMO_EMAIL = "chiojennifers@gmail.com";

export default function ForgotPass() {
  const [email, setEmail] = useState(DEV_MODE ? DEMO_EMAIL : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSendLink = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) return setError("Please enter a valid email.");

    setLoading(true);

    if (DEV_MODE) {
      // Demo mode: popup only
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 500);
    } else {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://localhost:5173/auth/new-password",
        });
        setLoading(false);
        if (error) setError(error.message);
        else setShowModal(true);
      } catch {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (!DEV_MODE) setEmail("");
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
          <h2>Reset Password</h2>
          <p className="subtitle">
            Enter your email to receive a password reset link.
          </p>

          {error && <div className="error-text">{error}</div>}

          <form onSubmit={handleSendLink}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={DEV_MODE} // prevent editing demo email
            />
            <button
              className={`primary-btn ${loading ? "loading-btn" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p style={{ marginTop: "24px" }}>
            Remember your password?{" "}
            <Link to="/auth/signin" className="link-btn">
              Sign In
            </Link>
          </p>
        </div>

        {showModal && (
          <div className="modal-overlay-small">
            <div className="modal-glass-small">
              <h3>Check Your Email</h3>
              <p style={{ color: "#9ca3af" }}>
                A password reset link has been sent to <b>{email}</b>. Click it
                to reset your password.
              </p>
              <button className="primary-btn full-width" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
