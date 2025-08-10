import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/AdminPanel.css"; // подключаем стили

export default function AdminPanel() {
  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <div className="admin-container">
      <h1 className="admin-title">Админ-панель</h1>

      <nav className="admin-nav">
        <NavLink to="users" className={linkClass}>
          Пользователи
        </NavLink>
        <NavLink to="courses" className={linkClass}>
          Курсы
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
