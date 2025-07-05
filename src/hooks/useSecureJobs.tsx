
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';
import { jobSchema, sanitizeInput } from '@/lib/validation';
import { z } from 'zod';

interface Job {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  category: string;
  job_type: 'good_deeds' | 'kein_bock';
  budget?: number;
  karma_reward?: number;
  location: string;
  latitude?: number;
  longitude?: number;
  status: string;
  assigned_to?: string;
  estimated_duration?: number;
  due_date?: string;
  images?: string[];
  requirements?: string[];
  created_at: string;
  updated_at: string;
}

interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  message: string;
  status: string;
  created_at: string;
}

type DatabaseJob = {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  category: string;
  job_type: string;
  budget?: number | null;
  karma_reward?: number | null;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  status: string | null;
  assigned_to?: string | null;
  estimated_duration?: number | null;
  due_date?: string | null;
  images?: string[] | null;
  requirements?: string[] | null;
  created_at: string | null;
  updated_at: string | null;
};

export function useSecureJobs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    if (user) {
      fetchMyJobs();
      fetchApplications();
    }
  }, [user]);

  // Helper function to transform and sanitize database job to our Job interface
  const transformDatabaseJob = (dbJob: DatabaseJob): Job => ({
    id: dbJob.id,
    creator_id: dbJob.creator_id,
    title: sanitizeInput(dbJob.title),
    description: sanitizeInput(dbJob.description || ''),
    category: sanitizeInput(dbJob.category),
    job_type: (dbJob.job_type === 'good_deeds' || dbJob.job_type === 'kein_bock') ? dbJob.job_type : 'good_deeds',
    budget: dbJob.budget || undefined,
    karma_reward: dbJob.karma_reward || undefined,
    location: sanitizeInput(dbJob.location),
    latitude: dbJob.latitude || undefined,
    longitude: dbJob.longitude || undefined,
    status: dbJob.status || 'open',
    assigned_to: dbJob.assigned_to || undefined,
    estimated_duration: dbJob.estimated_duration || undefined,
    due_date: dbJob.due_date || undefined,
    images: dbJob.images || undefined,
    requirements: dbJob.requirements?.map(req => sanitizeInput(req)) || undefined,
    created_at: dbJob.created_at || new Date().toISOString(),
    updated_at: dbJob.updated_at || new Date().toISOString(),
  });

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(100); // Limit results to prevent excessive data transfer

      if (error) throw error;
      
      const transformedJobs = (data || []).map(transformDatabaseJob);
      setJobs(transformedJobs);
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Fehler",
        description: "Jobs konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMyJobs = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const transformedJobs = (data || []).map(transformDatabaseJob);
      setMyJobs(transformedJobs);
    } catch (error: any) {
      console.error('Error fetching my jobs:', error);
      toast({
        title: "Fehler",
        description: "Ihre Jobs konnten nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  const fetchApplications = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('applicant_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      console.error('Error fetching applications:', error);
    }
  };

  const createJob = async (jobData: Partial<Job>) => {
    try {
      if (!user) throw new Error('Not authenticated');

      // Validate and sanitize input
      const validatedData = jobSchema.parse(jobData);

      const insertData = {
        creator_id: user.id,
        title: sanitizeInput(validatedData.title),
        description: validatedData.description ? sanitizeInput(validatedData.description) : null,
        category: sanitizeInput(validatedData.category),
        job_type: validatedData.job_type,
        budget: validatedData.budget || null,
        karma_reward: validatedData.karma_reward || null,
        location: sanitizeInput(validatedData.location),
        latitude: jobData.latitude || null,
        longitude: jobData.longitude || null,
        estimated_duration: validatedData.estimated_duration || null,
        due_date: validatedData.due_date || null,
        images: jobData.images || null,
        requirements: validatedData.requirements?.map(req => sanitizeInput(req)) || null,
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      // Log activity
      await supabase
        .from('activity_log')
        .insert({
          user_id: user.id,
          action: 'job_created',
          description: `Job "${sanitizeInput(validatedData.title)}" erstellt`,
          metadata: { job_id: data.id },
        });

      await fetchJobs();
      await fetchMyJobs();

      toast({
        title: "Job erstellt",
        description: "Ihr Job wurde erfolgreich veröffentlicht!",
      });

      return transformDatabaseJob(data);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Fehler",
          description: "Job konnte nicht erstellt werden.",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const applyForJob = async (jobId: string, message: string = '') => {
    try {
      if (!user) throw new Error('Not authenticated');

      // Sanitize message
      const sanitizedMessage = sanitizeInput(message);

      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          applicant_id: user.id,
          message: sanitizedMessage,
        });

      if (error) throw error;

      // Log activity
      await supabase
        .from('activity_log')
        .insert({
          user_id: user.id,
          action: 'job_applied',
          description: `Auf Job beworben`,
          metadata: { job_id: jobId },
        });

      await fetchApplications();

      toast({
        title: "Bewerbung gesendet",
        description: "Ihre Bewerbung wurde erfolgreich eingereicht!",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Bewerbung konnte nicht gesendet werden.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateJobStatus = async (jobId: string, status: string, assignedTo?: string) => {
    try {
      if (!user) throw new Error('Not authenticated');

      const updateData: any = { status: sanitizeInput(status) };
      if (assignedTo) updateData.assigned_to = assignedTo;

      const { error } = await supabase
        .from('jobs')
        .update(updateData)
        .eq('id', jobId)
        .eq('creator_id', user.id);

      if (error) throw error;

      await fetchJobs();
      await fetchMyJobs();

      toast({
        title: "Job aktualisiert",
        description: "Der Job-Status wurde erfolgreich geändert.",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Job-Status konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    jobs,
    myJobs,
    applications,
    loading,
    createJob,
    applyForJob,
    updateJobStatus,
    fetchJobs,
    fetchMyJobs,
    fetchApplications,
  };
}
