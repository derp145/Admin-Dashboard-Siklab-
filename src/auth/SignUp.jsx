import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowVerifyModal(true);
      setCodeDigits(["", "", "", ""]);
    }, 800);
  };

  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...codeDigits];
    newCode[index] = value;
    setCodeDigits(newCode);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError("");

    if (codeDigits.join("") !== "1234") {
      setError("Invalid verification code.");
      return;
    }

    setShowVerifyModal(false);
    setShowSuccessModal(true);
  };

  const handleResend = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      alert("A new verification code has been sent! (dummy)");
    }, 800);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    navigate("/auth/signin");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* LEFT PANEL */}
        <div className="auth-left">
          <div className="auth-left-overlay">
            <h1 className="siklab-logo">SIKLAB</h1>
          </div>
        </div>

        {/* RIGHT PANEL */}
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
              {loading ? "Sending Code..." : "Sign Up"}
            </button>
          </form>

          <p style={{ marginTop: "24px" }}>
            Already have an account?{" "}
            <Link to="/auth/signin" className="link-btn">
              Sign In
            </Link>
          </p>
        </div>

        {/* EMAIL VERIFICATION MODAL */}
        {showVerifyModal && (
          <div className="modal-overlay-small">
            <div className="modal-glass-small">
              <h3>Verify Your Email</h3>
              <p style={{ color: "#9ca3af" }}>
                Enter the 4-digit code sent to your email
              </p>

              {error && <div className="error-text">{error}</div>}

              <form onSubmit={handleVerifyCode}>
                <div className="code-inputs">
                  {codeDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputsRef.current[i] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleCodeChange(i, e.target.value)
                      }
                    />
                  ))}
                </div>
<div className="modal-secondary">
  <button
    type="button"
    className="link-btn"
    onClick={handleResend}
    disabled={loading}
  >
    {loading ? "Resending..." : "Resend"}
  </button>

  <button
    type="button"
    className="link-btn"
    onClick={() => setShowVerifyModal(false)}
  >
    Cancel
  </button>
</div>

<button className="primary-btn full-width" type="submit">
  Verify & Create
</button>

              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
