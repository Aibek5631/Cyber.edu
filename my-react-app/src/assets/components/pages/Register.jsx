// Пример в компоненте Register.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { signUp } = useAuth();
  const navigate       = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Регистрация:", email, password);
      await signUp(email, password);
      console.log("Успешная регистрация");
      navigate("/"); // или куда вам нужно
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}