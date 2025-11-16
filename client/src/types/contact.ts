export type ContactStatus = "new" | "read" | "replied";

export interface Contact {
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
  status: ContactStatus;
  created_at: string;
}
