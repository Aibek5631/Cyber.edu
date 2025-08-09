// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App       from "./App";
import "./index.css"; // ваш глобальный CSS

const container = document.getElementById("root");
if (!container) {
  throw new Error("Не найден элемент #root в index.html");
}

const root = ReactDOM.createRoot(container);
root.render(<App />);