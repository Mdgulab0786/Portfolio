import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsAuthed(false);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthed(res.ok);
      } catch {
        setIsAuthed(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;
  if (!isAuthed) return <Navigate to="/admin" />;
  return children;
};

export default ProtectedRoute;
