import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminRoute({ redirectTo = "/" }) {
  const { user } = useAuth();
  if (user?.role !== "admin") {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}