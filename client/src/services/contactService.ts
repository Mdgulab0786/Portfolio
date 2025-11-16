import type { Contact } from "@/types/contact";

// In unified deploy, omit VITE_API_BASE_URL to use same-origin relative routes
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const authHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export class ContactService {
  // Submit a new contact form
  static async submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
    budget?: string;
    timeline?: string;
    project_type?: string;
  }): Promise<Contact> {
    const res = await fetch(`${API_BASE}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to submit contact");
    }
    const json = await res.json();
    const mapped: Contact = {
      id: json._id || json.id,
      name: json.name,
      email: json.email,
      phone: json.phone,
      company: json.company,
      subject: json.subject,
      message: json.message,
      budget: json.budget,
      timeline: json.timeline,
      project_type: json.project_type,
      status: json.status || "new",
      created_at: json.createdAt || json.created_at || new Date().toISOString(),
    };
    return mapped;
  }

  // Get all contact submissions (admin only)
  static async getAllSubmissions(): Promise<{
    items: Contact[];
    stats: { total: number; unread: number; read: number };
  }> {
    const res = await fetch(`${API_BASE}/api/contacts`, {
      headers: { ...authHeader() },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch submissions");
    }
    const json = await res.json();
    const items: Contact[] = (json.items || []).map((d: any) => ({
      id: d._id || d.id,
      name: d.name,
      email: d.email,
      phone: d.phone,
      company: d.company,
      subject: d.subject,
      message: d.message,
      budget: d.budget,
      timeline: d.timeline,
      project_type: d.project_type,
      status: d.status || "new",
      created_at: d.createdAt || d.created_at,
    }));
    return { items, stats: json.stats };
  }

  // Update submission status
  static async updateSubmissionStatus(
    id: string,
    status: "new" | "read" | "replied"
  ): Promise<void> {
    if (status === "read") {
      const res = await fetch(`${API_BASE}/api/contacts/${id}/read`, {
        method: "PATCH",
        headers: { ...authHeader() },
      });
      if (!res.ok) throw new Error("Failed to update submission status");
    } else {
      // only 'read' is supported on server; other statuses ignored for now
    }
  }

  // Delete a submission
  static async deleteSubmission(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/contacts/${id}`, {
      method: "DELETE",
      headers: { ...authHeader() },
    });
    if (!res.ok) throw new Error("Failed to delete submission");
  }

  // Get contact statistics
  static async getStats(): Promise<{
    total: number;
    unread: number;
    read: number;
  }> {
    const { stats } = await this.getAllSubmissions();
    return stats;
  }
  // No realtime with Mongo by default; left as no-op
  static subscribeToChanges(_callback: (payload: any) => void) {
    return { unsubscribe: () => {} } as any;
  }
}
