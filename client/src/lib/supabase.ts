import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
  console.log("VITE_SUPABASE_URL:", supabaseUrl ? "Set" : "Missing");
  console.log("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Set" : "Missing");
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: "public",
  },
});

// Types for our database
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  project_type?: string;
  status: "new" | "read" | "replied";
  created_at: string;
  updated_at: string;
}

export interface ContactStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  todayCount: number;
  weekCount: number;
}

// Small helpers for auth-aware components
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
