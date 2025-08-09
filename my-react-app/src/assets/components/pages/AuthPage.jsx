import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, login, error, setError } = useAuth();
  const navigate = useNavigate();

  const [btnHover, setBtnHover] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      if (err.message?.includes("email-already-in-use")) {
        setError("Этот email уже занят. Войдите или используйте другой.");
      } else {
        setError(err.message || "Ошибка при аутентификации");
      }
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      background:
        "radial-gradient(600px 300px at 10% 10%, rgba(138,60,255,0.06), transparent), linear-gradient(180deg,#070809 0%, #0d0f14 100%)",
      padding: "48px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      marginTop: "40px",
      padding: "28px",
      borderRadius: "12px",
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      border: "1px solid rgba(255,255,255,0.04)",
      boxShadow: "0 10px 30px rgba(2,8,23,0.6)",
      color: "#eaf6ff",
    },
    title: {
      margin: 0,
      marginBottom: "14px",
      fontSize: "1.4rem",
      fontWeight: 700,
      color: "#8a3cff",
      letterSpacing: 0.3,
      textShadow: "0 6px 20px rgba(138,60,255,0.06)",
    },
    error: {
      marginBottom: "10px",
      color: "#ff6b6b",
      background: "rgba(255,107,107,0.06)",
      padding: "8px 10px",
      borderRadius: "8px",
      border: "1px solid rgba(255,107,107,0.12)",
      fontSize: "0.95rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      background: "#0f1720",
      border: "1px solid rgba(255,255,255,0.04)",
      borderRadius: "8px",
      color: "#eaf6ff",
      outline: "none",
      fontSize: "0.95rem",
      transition: "box-shadow 0.15s ease, border-color 0.15s ease",
    },
    inputFocus: {
      boxShadow: "0 6px 18px rgba(138,60,255,0.08)",
      borderColor: "rgba(138,60,255,0.6)",
    },
    submit: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "1rem",
      transition: "transform 0.12s ease, box-shadow 0.12s ease",
      background: btnHover
        ? "linear-gradient(90deg,#ff00ff,#00f0ff)"
        : "linear-gradient(90deg,#00f0ff,#8a3cff)",
      color: btnHover ? "#021a1f" : "#ffffff",
      boxShadow: btnHover ? "0 14px 40px rgba(0,240,255,0.12)" : "0 8px 22px rgba(138,60,255,0.06)",
      transform: btnHover ? "translateY(-3px)" : "none",
    },
    footerText: {
      marginTop: "16px",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "rgba(234,246,255,0.85)",
    },
    toggleBtn: {
      background: "transparent",
      border: "none",
      color: toggleHover ? "#ffcc00" : "#00f0ff",
      textDecoration: "underline",
      cursor: "pointer",
      padding: 0,
      fontWeight: 700,
    },
    smallMuted: {
      color: "rgba(234,246,255,0.7)",
    },
    labelRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "6px",
    },
  };

  // focus handling for inputs (small enhancement without changing structure)
  const [focusField, setFocusField] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isRegister ? "Регистрация" : "Вход"}</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.labelRow}>
            <label style={styles.smallMuted} htmlFor="email">
              Email
            </label>
            <span style={{ fontSize: "0.85rem", color: "rgba(234,246,255,0.6)" }}>
              {isRegister ? "Создайте новый аккаунт" : "Введите свои данные"}
            </span>
          </div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              ...styles.input,
              ...(focusField === "email" ? styles.inputFocus : {}),
            }}
            onFocus={() => setFocusField("email")}
            onBlur={() => setFocusField(null)}
          />

          <div style={styles.labelRow}>
            <label style={styles.smallMuted} htmlFor="password">
              Пароль
            </label>
            <span style={{ fontSize: "0.85rem", color: "rgba(234,246,255,0.6)" }}>
              минимум 6 символов
            </span>
          </div>
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              ...styles.input,
              ...(focusField === "password" ? styles.inputFocus : {}),
            }}
            onFocus={() => setFocusField("password")}
            onBlur={() => setFocusField(null)}
          />

          <button
            type="submit"
            style={styles.submit}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        <p style={styles.footerText}>
          {isRegister ? "Уже есть аккаунт? " : "Нет аккаунта? "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            style={styles.toggleBtn}
            onMouseEnter={() => setToggleHover(true)}
            onMouseLeave={() => setToggleHover(false)}
          >
            {isRegister ? "Войти" : "Регистрация"}
          </button>
        </p>
      </div>
    </div>
  );
}
