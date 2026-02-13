import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleSendCode = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
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

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError("");

    const code = codeDigits.join("");

    if (code !== "1234") {
      setError("Invalid verification code.");
      return;
    }

    setShowVerifyModal(false);
    navigate("/auth/new-password");
  };

  const handleResend = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      alert("A new verification code has been sent! (dummy)");
    }, 800);
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
          <h2>Reset Password</h2>
          <p className="subtitle">
            Enter your email to receive a verification code.
          </p>

          {error && <div className="error-text">{error}</div>}

          <form onSubmit={handleSendCode}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              className={`primary-btn ${loading ? "loading-btn" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>

          <p style={{ marginTop: "24px" }}>
            Remember your password?{" "}
            <Link to="/auth/signin" className="link-btn">
              Sign In
            </Link>
          </p>
        </div>

        {/* VERIFICATION MODAL (Consistent with other auth pages) */}
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
                      onKeyDown={(e) => handleKeyDown(i, e)}
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
  Verify
</button>

              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
