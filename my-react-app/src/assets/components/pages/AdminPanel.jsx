import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminPanel() {
  const styles = {
    container: {
      fontFamily: "'Segoe UI', sans-serif",
      padding: "20px",
      backgroundColor: "#1e1e1e",
      color: "#fff",
      minHeight: "100vh"
    },
    title: {
      fontSize: "2rem",
      marginBottom: "20px",
      color: "#ffcc00"
    },
    nav: {
      marginBottom: "20px"
    },
    link: {
      marginRight: "15px",
      textDecoration: "none",
      color: "#fff",
      transition: "color 0.2s"
    },
    linkHover: {
      color: "#ffcc00"
    },
    activeLink: {
      fontWeight: "bold",
      color: "#ffcc00"
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? { ...styles.link, ...styles.activeLink }
      : styles.link;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Админ-панель</h1>
      <nav style={styles.nav}>
        <NavLink
          to="users"
          style={({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link)}
          onMouseEnter={(e) => (e.target.style.color = "#ffcc00")}
          onMouseLeave={(e) => (e.target.style.color = isActive ? "#ffcc00" : "#fff")}
        >
          Пользователи
        </NavLink>
        <NavLink
          to="courses"
          style={({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link)}
          onMouseEnter={(e) => (e.target.style.color = "#ffcc00")}
          onMouseLeave={(e) => (e.target.style.color = isActive ? "#ffcc00" : "#fff")}
        >
          Курсы
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
