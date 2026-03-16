import { useState } from "react";
import { styles } from "../styles/bookmyshow.styles.js";

export function LoginPage({ setPage, setIsAuthenticated, setUserName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Mock login
    const userName = email.split("@")[0];
    setUserName(userName);
    setIsAuthenticated(true);
    setPage("home");
  };

  const styles_local = {
    container: {
      fontFamily: "'Syne', 'Poppins', sans-serif",
      background: "#0d0d0f",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#f0ece4",
    },
    formWrapper: {
      width: "100%",
      maxWidth: 450,
      padding: "40px",
      background: "linear-gradient(135deg, rgba(26, 10, 0, 0.8), rgba(22, 22, 24, 0.8))",
      border: "1px solid rgba(255, 69, 0, 0.2)",
      borderRadius: 24,
      backdropFilter: "blur(10px)",
      boxShadow: "0 20px 60px rgba(255, 69, 0, 0.1)",
    },
    logo: {
      fontSize: 32,
      fontWeight: 900,
      letterSpacing: "-2px",
      marginBottom: 8,
      textAlign: "center",
      background: "linear-gradient(135deg, #ff4500, #ff8c00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      textAlign: "center",
      color: "rgba(240, 236, 228, 0.5)",
      fontSize: 14,
      marginBottom: 32,
      marginTop: 8,
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      display: "block",
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 8,
      color: "#ff8c00",
      letterSpacing: 0.5,
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      fontSize: 14,
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.05)",
      color: "#f0ece4",
      outline: "none",
      transition: "all 0.3s",
      boxSizing: "border-box",
    },
    inputFocus: {
      border: "1px solid rgba(255, 140, 0, 0.5)",
      background: "rgba(255, 255, 255, 0.08)",
      boxShadow: "0 0 12px rgba(255, 69, 0, 0.1)",
    },
    error: {
      color: "#ff6b6b",
      fontSize: 12,
      marginTop: 6,
      display: "flex",
      alignItems: "center",
      gap: 4,
    },
    button: {
      width: "100%",
      padding: "14px",
      fontSize: 15,
      fontWeight: 800,
      border: "none",
      borderRadius: 12,
      background: "linear-gradient(135deg, #ff4500, #ff8c00)",
      color: "#fff",
      cursor: "pointer",
      transition: "all 0.3s",
      letterSpacing: 0.5,
      marginTop: 24,
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 24px rgba(255, 69, 0, 0.3)",
    },
    footer: {
      textAlign: "center",
      marginTop: 24,
      fontSize: 13,
      color: "rgba(240, 236, 228, 0.5)",
    },
    link: {
      color: "#ff8c00",
      fontWeight: 700,
      cursor: "pointer",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "24px 0",
      color: "rgba(240, 236, 228, 0.3)",
      fontSize: 12,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      background: "rgba(255, 255, 255, 0.1)",
    },
    socialButtons: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginTop: 12,
    },
    socialBtn: {
      padding: "10px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: 10,
      background: "rgba(255, 255, 255, 0.05)",
      color: "#f0ece4",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      transition: "all 0.3s",
    },
  };

  return (
    <div style={styles_local.container}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
      <div style={styles_local.formWrapper}>
        <div style={styles_local.logo}>🎬 BookMyShow</div>
        <p style={styles_local.subtitle}>Sign in to book your favorite movies</p>

        <form onSubmit={handleLogin}>
          <div style={styles_local.formGroup}>
            <label style={styles_local.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                ...styles_local.input,
              }}
              onFocus={(e) => Object.assign(e.target.style, styles_local.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, {
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
              })}
            />
          </div>

          <div style={styles_local.formGroup}>
            <label style={styles_local.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles_local.input,
              }}
              onFocus={(e) => Object.assign(e.target.style, styles_local.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, {
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
              })}
            />
          </div>

          {error && (
            <div style={styles_local.error}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            style={styles_local.button}
            onMouseEnter={(e) => Object.assign(e.target.style, styles_local.buttonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { transform: "none", boxShadow: "none" })}
          >
            Sign In →
          </button>
        </form>

        <div style={styles_local.divider}>
          <div style={styles_local.dividerLine} />
          <span>OR</span>
          <div style={styles_local.dividerLine} />
        </div>

        <div style={styles_local.socialButtons}>
          <button style={styles_local.socialBtn}>Google</button>
          <button style={styles_local.socialBtn}>GitHub</button>
        </div>

        <p style={styles_local.footer}>
          Don't have an account?{" "}
          <span
            style={styles_local.link}
            onClick={() => setPage("signup")}
            onMouseEnter={(e) => e.target.style.color = "#ffaa33"}
            onMouseLeave={(e) => e.target.style.color = "#ff8c00"}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}
