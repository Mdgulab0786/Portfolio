import { ContactSubmission, ContactStats } from '../types/contact';

const STORAGE_KEY = 'contact_submissions';

export const contactStorage = {
  // Save a new contact submission
  saveSubmission: (submission: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>): ContactSubmission => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    const existing = contactStorage.getAllSubmissions();
    const updated = [newSubmission, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    return newSubmission;
  },

  // Get all submissions
  getAllSubmissions: (): ContactSubmission[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading contact submissions:', error);
      return [];
    }
  },

  // Update submission status
  updateSubmissionStatus: (id: string, status: ContactSubmission['status']): void => {
    const submissions = contactStorage.getAllSubmissions();
    const updated = submissions.map(sub => 
      sub.id === id ? { ...sub, status } : sub
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  // Delete a submission
  deleteSubmission: (id: string): void => {
    const submissions = contactStorage.getAllSubmissions();
    const updated = submissions.filter(sub => sub.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  // Get contact statistics
  getStats: (): ContactStats => {
    const submissions = contactStorage.getAllSubmissions();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      total: submissions.length,
      new: submissions.filter(sub => sub.status === 'new').length,
      read: submissions.filter(sub => sub.status === 'read').length,
      replied: submissions.filter(sub => sub.status === 'replied').length,
      todayCount: submissions.filter(sub => 
        new Date(sub.submittedAt) >= today
      ).length,
      weekCount: submissions.filter(sub => 
        new Date(sub.submittedAt) >= weekAgo
      ).length
    };
  },

  // Clear all submissions (for testing)
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};