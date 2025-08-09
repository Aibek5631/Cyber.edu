import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function Layout() {
  const { user, logout } = useAuth();

  const styles = {
    layout: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    nav: {
      backgroundColor: "#111",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 0 15px rgba(0, 255, 247, 0.3)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    link: {
      color: "#00fff7",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      padding: "5px 10px",
      borderRadius: "6px",
    },
    linkHover: {
      background: "rgba(0, 255, 247, 0.1)",
      boxShadow: "0 0 10px #00fff7",
    },
    linkActive: {
      fontWeight: "bold",
      background: "linear-gradient(90deg, #ff00ff, #00fff7)",
      color: "#fff",
      boxShadow: "0 0 15px #ff00ff, 0 0 30px #00fff7",
    },
    button: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s ease",
      fontWeight: "500",
    },
    logoutBtn: {
      background: "#e63946",
      color: "#fff",
    },
    logoutBtnHover: {
      background: "#d62828",
    },
    loginBtn: {
      background: "#38b000",
      color: "#fff",
    },
    loginBtnHover: {
      background: "#2d6a4f",
    },
    main: {
      flex: 1,
      padding: "30px",
    },
  };

  const [hovered, setHovered] = React.useState(null);

  const renderLink = (to, label, index) => (
    <NavLink
      key={index}
      to={to}
      style={({ isActive }) => ({
        ...styles.link,
        ...(hovered === index ? styles.linkHover : {}),
        ...(isActive ? styles.linkActive : {}),
      })}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      {label}
    </NavLink>
  );

  const [btnHover, setBtnHover] = React.useState(null);

  return (
    <div style={styles.layout}>
      <nav style={styles.nav}>
        {renderLink("/", "Home", 0)}
        {renderLink("/courses", "Courses", 1)}
        {renderLink("/cards", "Cards", 2)}
        {user?.role === "admin" && renderLink("/admin", "Admin", 3)}
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          {renderLink("/profile", "Profile", 4)}
          {user ? (
            <button
              style={{
                ...styles.button,
                ...styles.logoutBtn,
                ...(btnHover === "logout" ? styles.logoutBtnHover : {}),
              }}
              onMouseEnter={() => setBtnHover("logout")}
              onMouseLeave={() => setBtnHover(null)}
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              style={{
                ...styles.button,
                ...styles.loginBtn,
                ...(btnHover === "login" ? styles.loginBtnHover : {}),
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={() => setBtnHover("login")}
              onMouseLeave={() => setBtnHover(null)}
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
