import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Auth.css";

const DEV_MODE = false;
const DEMO_EMAIL = "chiojennifers@gmail.com";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(DEV_MODE ? DEMO_EMAIL : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Basic validation
    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!email.includes("@")) return setError("Please enter a valid email.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match!");

    setLoading(true);

    // Save user locally for quick reference
    const newUser = { fullName, email, password };
    localStorage.setItem("userProfile", JSON.stringify(newUser));

    if (DEV_MODE) {
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 500);
    } else {
      try {
        const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: { data: { fullName } }
});

if (error) setError(error.message);
else setShowModal(true); // show modal confirming account created

        setLoading(false);
        if (error) setError(error.message);
        else setShowModal(true); // Show modal after sending link
      } catch {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    if (!DEV_MODE) setEmail("");
    navigate("/auth/signin"); // redirect to sign-in page after modal
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
          <h2>Create Account</h2>
          <p className="subtitle">Fill in your details to get started</p>

          {error && <div className="error-text">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={DEV_MODE}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              className={`primary-btn ${loading ? "loading-btn" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending Link..." : "Sign Up"}
            </button>
          </form>

          <p style={{ marginTop: "24px" }}>
            Already have an account?{" "}
            <Link to="/auth/signin" className="link-btn">
              Sign In
            </Link>
          </p>
        </div>

        {/* ✅ Email confirmation modal */}
        {showModal && (
          <div className="modal-overlay-small">
            <div className="modal-glass-small">
              <h3>Check Your Email</h3>
             <p style={{ color: "#9ca3af" }}>
  A verification link has been sent to <b>{email}</b>.<br />
  Click the link in your email to complete your signup.<br />
  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
    If you don't see it in your inbox, please check your spam or junk folder.
  </span>
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