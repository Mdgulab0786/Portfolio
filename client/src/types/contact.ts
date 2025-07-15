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
  projectType?: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface ContactStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  todayCount: number;
  weekCount: number;
}