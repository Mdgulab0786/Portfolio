import { supabase, ContactSubmission, ContactStats } from '../lib/supabase';

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
  }): Promise<ContactSubmission> {
    console.log('Submitting contact form with data:', data);
    
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        subject: data.subject,
        message: data.message,
        budget: data.budget || null,
        timeline: data.timeline || null,
        project_type: data.project_type || null,
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error submitting contact form:', {
        error,
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Database error: ${error.message}`);
    }

    if (!submission) {
      throw new Error('No data returned from database');
    }

    console.log('Contact form submitted successfully:', submission);
    return submission;
  }

  // Get all contact submissions (admin only)
  static async getAllSubmissions(): Promise<ContactSubmission[]> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      throw new Error('Failed to fetch submissions');
    }

    return data || [];
  }

  // Update submission status
  static async updateSubmissionStatus(id: string, status: 'new' | 'read' | 'replied'): Promise<void> {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating submission status:', error);
      throw new Error('Failed to update submission status');
    }
  }

  // Delete a submission
  static async deleteSubmission(id: string): Promise<void> {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting submission:', error);
      throw new Error('Failed to delete submission');
    }
  }

  // Get contact statistics
  static async getStats(): Promise<ContactStats> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('status, created_at');

    if (error) {
      console.error('Error fetching stats:', error);
      throw new Error('Failed to fetch statistics');
    }

    const submissions = data || [];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      total: submissions.length,
      new: submissions.filter(sub => sub.status === 'new').length,
      read: submissions.filter(sub => sub.status === 'read').length,
      replied: submissions.filter(sub => sub.status === 'replied').length,
      todayCount: submissions.filter(sub => 
        new Date(sub.created_at) >= today
      ).length,
      weekCount: submissions.filter(sub => 
        new Date(sub.created_at) >= weekAgo
      ).length
    };
  }

  // Subscribe to real-time changes (for admin dashboard)
  static subscribeToChanges(callback: (payload: any) => void) {
    return supabase
      .channel('contact_submissions_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'contact_submissions' 
        }, 
        callback
      )
      .subscribe();
  }
}