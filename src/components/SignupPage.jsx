import { useState } from "react";
import { styles } from "../styles/bookmyshow.styles.js";

export function SignupPage({ setPage, setIsAuthenticated, setUserName }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    // Mock signup
    const userName = formData.fullName.split(" ")[0];
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
      padding: "20px",
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
      maxHeight: "90vh",
      overflowY: "auto",
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
      marginBottom: 18,
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
    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      color: "rgba(240, 236, 228, 0.7)",
      cursor: "pointer",
    },
    checkboxInput: {
      cursor: "pointer",
      width: 18,
      height: 18,
      accentColor: "#ff8c00",
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
  };

  return (
    <div style={styles_local.container}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
      <div style={styles_local.formWrapper}>
        <div style={styles_local.logo}>🎬 BookMyShow</div>
        <p style={styles_local.subtitle}>Create your account to get started</p>

        <form onSubmit={handleSignup}>
          <div style={styles_local.formGroup}>
            <label style={styles_local.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              style={styles_local.input}
              onFocus={(e) => Object.assign(e.target.style, styles_local.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, {
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
              })}
            />
          </div>

          <div style={styles_local.formGroup}>
            <label style={styles_local.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              style={styles_local.input}
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
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={styles_local.input}
              onFocus={(e) => Object.assign(e.target.style, styles_local.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, {
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
              })}
            />
          </div>

          <div style={styles_local.formGroup}>
            <label style={styles_local.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles_local.input}
              onFocus={(e) => Object.assign(e.target.style, styles_local.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, {
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
              })}
            />
          </div>

          <div style={{ ...styles_local.formGroup, marginTop: 24 }}>
            <label style={styles_local.checkbox}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                style={styles_local.checkboxInput}
              />
              I agree to the{" "}
              <span style={{ color: "#ff8c00", fontWeight: 600 }}>Terms & Conditions</span>
            </label>
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
            Create Account →
          </button>
        </form>

        <p style={styles_local.footer}>
          Already have an account?{" "}
          <span
            style={styles_local.link}
            onClick={() => setPage("login")}
            onMouseEnter={(e) => e.target.style.color = "#ffaa33"}
            onMouseLeave={(e) => e.target.style.color = "#ff8c00"}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
