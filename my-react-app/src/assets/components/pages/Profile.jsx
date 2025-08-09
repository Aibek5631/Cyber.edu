import React from "react";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-2xl mb-4">Профиль</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}