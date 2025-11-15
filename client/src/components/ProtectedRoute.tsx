import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "@/lib/supabase";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      setIsAuthed(!!session);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;
  if (!isAuthed) return <Navigate to="/admin" />;
  return children;
};

export default ProtectedRoute;
