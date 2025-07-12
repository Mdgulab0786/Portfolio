// src/pages/AdminPage.tsx
import React from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const AdminPage = () => {
  const token = localStorage.getItem("adminToken");

  return token ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminPage;
