import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email === "admin" && password === "123") {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
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
            <button className="primary-btn" type="submit">Sign In</button>
          </form>

          <p style={{ marginTop: "12px" }}>
            <Link to="/auth/forgot" className="link-btn">Forgot Password?</Link>
          </p>

          <p style={{ marginTop: "24px" }}>
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="link-btn">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
