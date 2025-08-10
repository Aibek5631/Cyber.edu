import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminPanel() {
  const styles = {
    container: {
      fontFamily: "'Segoe UI', sans-serif",
      padding: "40px",
      backgroundColor: "#0f0f0f",
      color: "#f0f0f0",
      minHeight: "100vh"
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "30px",
      color: "#ffcc00",
      borderBottom: "2px solid #ffcc00",
      paddingBottom: "10px"
    },
    nav: {
      marginBottom: "40px",
      display: "flex",
      gap: "20px"
    },
    link: {
      textDecoration: "none",
      color: "#f0f0f0",
      fontSize: "1.1rem",
      padding: "10px 18px",
      borderRadius: "8px",
      backgroundColor: "#1e1e1e",
      transition: "all 0.3s ease"
    },
    activeLink: {
      backgroundColor: "#ffcc00",
      color: "#0f0f0f",
      fontWeight: "bold"
    }
  };

  const linkClass = ({ isActive }) =>
    isActive ? { ...styles.link, ...styles.activeLink } : styles.link;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Админ-панель</h1>

      <nav style={styles.nav}>
        <NavLink to="users" style={linkClass}>
          Пользователи
        </NavLink>
        <NavLink to="courses" style={linkClass}>
          Курсы
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}