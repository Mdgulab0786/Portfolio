import React from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const AdminPage = () => {
  const token = localStorage.getItem("adminToken");

  // Check if token is valid (basic validation)
  const isValidToken = () => {
    if (!token) return false;
    
    try {
      // For demo token, decode and check
      const decoded = JSON.parse(atob(token));
      return decoded.username && decoded.loginTime;
    } catch {
      return false;
    }
  };

  return isValidToken() ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminPage;