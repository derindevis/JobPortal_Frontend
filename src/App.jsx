import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import ApplicationList from "./components/ApplicationList";
import CreateJobPage from "./pages/CreateJobPage";
import EditJobPage from "./pages/EditJobPage";
import CreateAppPage from "./pages/CreateAppPage";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";

// A layout wrapper that renders the Header and a padded main content area
function AppLayout({ children, setToken }) {
  return (
    <>
      <Header setToken={setToken} />
      <main className="main-content">
        {children}
      </main>
    </>
  );
}

// Inner component for Auth pages so we can use useNavigate inside Router
function LoginPage({ setToken }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    const role = localStorage.getItem("role");
    return <Navigate to={role === "admin" ? "/admin" : "/jobs"} replace />;
  }

  return (
    <div className="sma-auth-container">
      <LoginForm
        onLoginSuccess={() => {
          setToken(localStorage.getItem("token"));
          const role = localStorage.getItem("role");
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/jobs");
          }
        }}
        onSwitchToRegister={() => navigate("/register")}
      />
    </div>
  );
}

function RegisterPage() {
  const token = localStorage.getItem("token");

  if (token) {
    const role = localStorage.getItem("role");
    return <Navigate to={role === "admin" ? "/admin" : "/jobs"} replace />;
  }

  return (
    <div className="sma-auth-container">
      <RegisterForm />
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Keep state in sync with localStorage (e.g. if the user logs out from header)
  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const adminRedirect = localStorage.getItem("role") === "admin" ? "/admin" : "/jobs";

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <AppLayout setToken={setToken}>
              <LandingPage />
            </AppLayout>
          }
        />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Jobs & Applications Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <AppLayout setToken={setToken}>
                <JobList />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <AppLayout setToken={setToken}>
                <JobDetail />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/new"
          element={
            <ProtectedRoute role="admin">
              <AppLayout setToken={setToken}>
                <CreateJobPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AppLayout setToken={setToken}>
                <AdminDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute role="admin">
              <AppLayout setToken={setToken}>
                <EditJobPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <AppLayout setToken={setToken}>
                <ApplicationList />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/new"
          element={
            <ProtectedRoute>
              <AppLayout setToken={setToken}>
                <CreateAppPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all Redirect */}
        <Route
          path="*"
          element={<Navigate to={token ? adminRedirect : "/"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
