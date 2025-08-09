import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const { signup, login, error, setError } = useAuth();
  const navigate = useNavigate();

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
      if (err.message.includes("email-already-in-use")) {
        setError("Этот email уже занят. Войдите или используйте другой.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-gray-800 text-white rounded">
      <h2 className="text-2xl mb-4">{isRegister ? "Регистрация" : "Вход"}</h2>
      {error && <p className="mb-2 text-red-400">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-2 rounded">
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        {isRegister ? "Уже есть аккаунт? " : "Нет аккаунта? "}
        <button onClick={() => setIsRegister(!isRegister)} className="text-yellow-300 underline">
          {isRegister ? "Войти" : "Регистрация"}
        </button>
      </p>
    </div>
  );
}