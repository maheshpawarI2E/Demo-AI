import { useState } from "react";
import { styles } from "../styles/bookmyshow.styles.js";

export function LoginModal({ setShowLoginModal, setIsAuthenticated, setUserName, setPage }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (email.length > 0 && password.length > 0) {
      setUserName(email.split("@")[0]);
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setError("");
    }
  }

  function handleSignup() {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (email.length > 0 && password.length > 0) {
      setUserName(email.split("@")[0]);
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setError("");
    }
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
      <div style={{
        background: "#161618",
        border: "1px solid rgba(255,69,0,0.2)",
        borderRadius: 24,
        padding: 40,
        width: 420,
        maxWidth: "90vw",
        boxShadow: "0 20px 60px rgba(255,69,0,0.15)",
      }}>
        <h2 style={{
          margin: "0 0 8px",
          fontSize: 28,
          fontWeight: 900,
          color: "#f0ece4",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          {isSignup ? "🎬 Create Account" : "🎟️ Login to BookMyShow"}
        </h2>
        <p style={{
          color: "rgba(240,236,228,0.5)",
          fontSize: 13,
          margin: "0 0 24px",
        }}>
          {isSignup ? "Sign up to complete your booking" : "Login to proceed with payment"}
        </p>

        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
            padding: "10px 14px",
            borderRadius: 8,
            fontSize: 13,
            marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            color: "#ff8c00",
            marginBottom: 8,
          }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "#f0ece4",
              fontSize: 14,
              boxSizing: "border-box",
              outline: "none",
            }}
            placeholder="your@email.com"
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            color: "#ff8c00",
            marginBottom: 8,
          }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "#f0ece4",
              fontSize: 14,
              boxSizing: "border-box",
              outline: "none",
            }}
            placeholder="••••••••"
          />
        </div>

        {isSignup && (
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#ff8c00",
              marginBottom: 8,
            }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: "#f0ece4",
                fontSize: 14,
                boxSizing: "border-box",
                outline: "none",
              }}
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          onClick={isSignup ? handleSignup : handleLogin}
          style={{
            ...styles.primaryBtn,
            width: "100%",
            padding: "14px 28px",
            fontSize: 15,
            marginBottom: 12,
          }}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            width: "100%",
            padding: "12px 28px",
            background: "rgba(255,140,0,0.1)",
            border: "1px solid rgba(255,140,0,0.3)",
            color: "#ff8c00",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 12,
          }}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </button>

        <button
          onClick={() => setShowLoginModal(false)}
          style={{
            width: "100%",
            padding: "12px 28px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#f0ece4",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
          }}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
