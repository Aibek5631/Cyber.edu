// src/auth/AuthProvider.jsx

import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext({
  user: null,
  isAuthLoading: true,
  authError: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    console.log("AuthProvider: подписываемся на onAuthStateChanged");

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        console.log("AuthProvider: статус юзера изменился:", firebaseUser);
        setUser(firebaseUser);
        setIsAuthLoading(false);
      },
      (error) => {
        console.error("AuthProvider: ошибка авторизации:", error);
        setAuthError(error);
        setIsAuthLoading(false);
      }
    );

    return () => {
      console.log("AuthProvider: отписываемся от onAuthStateChanged");
      unsubscribe();
    };
  }, []);

  if (isAuthLoading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        Загрузка пользователя…
      </div>
    );
  }

  if (authError) {
    return (
      <div style={{ color: "red", padding: 20, textAlign: "center" }}>
        Ошибка авторизации: {authError.message}
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Добавляем дефолтный экспорт, чтобы можно было писать:
// import AuthProvider from "./auth/AuthProvider";
export default AuthProvider;