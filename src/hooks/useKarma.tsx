import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export type UserRank = 'starter' | 'community' | 'erfahren' | 'vertrauensperson' | 'vorbild';

interface KarmaTransaction {
  id: string;
  points: number;
  reason: string;
  transaction_type: string;
  created_at: string;
  job_id?: string;
  mission_id?: string;
}

interface UserStats {
  karma_points: number;
  cash_points: number;
  rank: UserRank;
  good_deeds_completed: number;
  streak_days: number;
}

export function useKarma() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [transactions, setTransactions] = useState<KarmaTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserStats();
      fetchTransactions();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('karma_points, cash_points, rank, good_deeds_completed, streak_days')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserStats(data);
    } catch (error: any) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('karma_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      console.error('Error fetching karma transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const awardKarma = async (
    points: number,
    reason: string,
    transactionType: string = 'manual',
    jobId?: string,
    missionId?: string
  ) => {
    try {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase.rpc('award_karma', {
        user_id: user.id,
        points,
        reason,
        job_id: jobId,
        mission_id: missionId,
        transaction_type: transactionType
      });

      if (error) throw error;

      await fetchUserStats();
      await fetchTransactions();

      toast({
        title: "Karma erhalten!",
        description: `Du hast ${points} Karma-Punkte erhalten: ${reason}`,
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

  const convertKarmaToCash = async (karmaAmount: number) => {
    try {
      if (!user || !userStats) throw new Error('Not authenticated');

      if (userStats.karma_points < karmaAmount) {
        throw new Error('Nicht genügend Karma-Punkte');
      }

      if (karmaAmount < 100) {
        throw new Error('Mindestens 100 Karma-Punkte erforderlich');
      }

      const cashPoints = Math.floor(karmaAmount / 100); // 100 Karma = 1 Cash Point

      // Deduct karma and add cash points
      const { error } = await supabase
        .from('profiles')
        .update({
          karma_points: userStats.karma_points - karmaAmount,
          cash_points: userStats.cash_points + cashPoints,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Log the transaction
      await supabase
        .from('karma_transactions')
        .insert({
          user_id: user.id,
          points: -karmaAmount,
          reason: `Umwandlung in ${cashPoints} Cash-Punkte`,
          transaction_type: 'conversion'
        });

      await fetchUserStats();
      await fetchTransactions();

      toast({
        title: "Erfolgreiche Umwandlung",
        description: `${karmaAmount} Karma in ${cashPoints} Cash-Punkte umgewandelt`,
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

  const getRankInfo = (rank: UserRank) => {
    const rankInfo = {
      starter: {
        name: 'Starter',
        minKarma: 0,
        minGoodDeeds: 0,
        nextRank: 'community',
        nextRequirement: '100 Karma-Punkte',
        jobLevel: 1,
        color: 'text-gray-500'
      },
      community: {
        name: 'Community',
        minKarma: 100,
        minGoodDeeds: 0,
        nextRank: 'erfahren',
        nextRequirement: '250 Karma + 1 Good Deed',
        jobLevel: 2,
        color: 'text-blue-500'
      },
      erfahren: {
        name: 'Erfahren',
        minKarma: 250,
        minGoodDeeds: 1,
        nextRank: 'vertrauensperson',
        nextRequirement: '500 Karma + 3 Good Deeds',
        jobLevel: 3,
        color: 'text-green-500'
      },
      vertrauensperson: {
        name: 'Vertrauensperson',
        minKarma: 500,
        minGoodDeeds: 3,
        nextRank: 'vorbild',
        nextRequirement: '1000 Karma + 5 Good Deeds',
        jobLevel: 4,
        color: 'text-purple-500'
      },
      vorbild: {
        name: 'Vorbild',
        minKarma: 1000,
        minGoodDeeds: 5,
        nextRank: null,
        nextRequirement: 'Maximaler Rang erreicht!',
        jobLevel: 5,
        color: 'text-yellow-500'
      }
    };

    return rankInfo[rank];
  };

  const calculateNextRankProgress = () => {
    if (!userStats) return { progress: 0, missing: '' };

    const currentRankInfo = getRankInfo(userStats.rank);
    if (!currentRankInfo.nextRank) return { progress: 100, missing: 'Maximaler Rang erreicht!' };

    const nextRankInfo = getRankInfo(currentRankInfo.nextRank as UserRank);
    
    const karmaProgress = Math.min(userStats.karma_points / nextRankInfo.minKarma, 1);
    const goodDeedsProgress = Math.min(userStats.good_deeds_completed / nextRankInfo.minGoodDeeds, 1);
    
    const totalProgress = Math.min(karmaProgress, goodDeedsProgress) * 100;
    
    const missingKarma = Math.max(0, nextRankInfo.minKarma - userStats.karma_points);
    const missingGoodDeeds = Math.max(0, nextRankInfo.minGoodDeeds - userStats.good_deeds_completed);
    
    let missing = '';
    if (missingKarma > 0 && missingGoodDeeds > 0) {
      missing = `${missingKarma} Karma + ${missingGoodDeeds} Good Deeds`;
    } else if (missingKarma > 0) {
      missing = `${missingKarma} Karma-Punkte`;
    } else if (missingGoodDeeds > 0) {
      missing = `${missingGoodDeeds} Good Deeds`;
    }

    return { progress: totalProgress, missing };
  };

  return {
    userStats,
    transactions,
    loading,
    awardKarma,
    convertKarmaToCash,
    getRankInfo,
    calculateNextRankProgress,
    fetchUserStats,
    fetchTransactions
  };
}