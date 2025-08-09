import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./assets/components/hooks/useAuth";
import { QuizProvider } from "./assets/components/hooks/useQuiz";

import ProtectedRoute from "./assets/components/routes/ProtectedRoute";
import AdminRoute     from "./assets/components/routes/AdminRoute";

import Layout         from "./assets/components/Layout";
import AuthPage       from "./assets/components/pages/AuthPage";
import HomePage       from "./assets/components/pages/HomePage";
import CoursesPage    from "./assets/components/pages/Courses";
import CardsPage      from "./assets/components/pages/Cards";
import ProfilePage    from "./assets/components/pages/Profile";
import AdminPanel     from "./assets/components/pages/AdminPanel";
import AdminUsers     from "./assets/components/pages/AdminUsers";
import AdminCourses   from "./assets/components/pages/AdminCourses";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <Routes>

            {/* Public */}
            <Route path="/login" element={<AuthPage />} />

            {/* Protected + Layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="cards"   element={<CardsPage />} />
                <Route path="profile" element={<ProfilePage />} />

                {/* Admin area */}
                <Route element={<AdminRoute />}>
                  <Route path="admin" element={<AdminPanel />}>
                    <Route index element={<AdminUsers />} />
                    <Route path="users"   element={<AdminUsers />} />
                    <Route path="courses" element={<AdminCourses />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}