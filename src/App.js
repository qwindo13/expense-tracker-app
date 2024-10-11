import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/Login/Login";
import HomePage from "./pages/Home/Home";
import "./styles/global.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

// Created a separate component to fix the issue of the useAuth hook not being able to be used in the App component

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
