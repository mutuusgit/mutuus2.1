
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

interface TutorialProgress {
  id: string;
  lesson_id: string;
  category_id: string;
  completed_at: string;
  xp_earned: number;
  time_spent: number;
}

export function useTutorial() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<TutorialProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('tutorial_progress')
        .select('*')
        .eq('user_id', user?.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setProgress(data || []);
    } catch (error: any) {
      console.error('Error fetching tutorial progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeLesson = async (
    lessonId: string,
    categoryId: string,
    xpEarned: number,
    timeSpent: number
  ) => {
    try {
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('tutorial_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          category_id: categoryId,
          xp_earned: xpEarned,
          time_spent: timeSpent,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Log activity
      await supabase
        .from('activity_log')
        .insert({
          user_id: user.id,
          action: 'lesson_completed',
          description: `Lektion ${lessonId} abgeschlossen`,
          metadata: {
            lesson_id: lessonId,
            category_id: categoryId,
            xp_earned: xpEarned,
            time_spent: timeSpent,
          },
        });

      await fetchProgress();
      
      toast({
        title: "Lektion abgeschlossen!",
        description: `Du hast ${xpEarned} XP erhalten!`,
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.some(p => p.lesson_id === lessonId);
  };

  const getTotalXP = () => {
    return progress.reduce((total, p) => total + p.xp_earned, 0);
  };

  const getCompletedLessonsCount = () => {
    return progress.length;
  };

  return {
    progress,
    loading,
    completeLesson,
    isLessonCompleted,
    getTotalXP,
    getCompletedLessonsCount,
    fetchProgress,
  };
}
