// src/assets/components/Navbar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav style={{ padding: 10, background: "#222", color: "#fff" }}>
      <NavLink to="/"       style={{ margin: "0 10px" }}>Главная</NavLink>
      <NavLink to="/courses" style={{ margin: "0 10px" }}>Курсы</NavLink>
      <NavLink to="/cards"   style={{ margin: "0 10px" }}>Викторина</NavLink>
      <NavLink to="/profile" style={{ margin: "0 10px" }}>Профиль</NavLink>
      {user?.isAdmin && (
        <NavLink to="/admin" style={{ margin: "0 10px" }}>Админка</NavLink>
      )}
      {/* или всегда показать админку, если нет isAdmin */}
    </nav>
  );
}