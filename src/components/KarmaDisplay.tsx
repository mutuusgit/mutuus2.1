import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useKarma } from '@/hooks/useKarma';
import { Star, TrendingUp, Award, Coins } from 'lucide-react';

interface KarmaDisplayProps {
  showDetails?: boolean;
}

export function KarmaDisplay({ showDetails = true }: KarmaDisplayProps) {
  const { userStats, getRankInfo, calculateNextRankProgress, loading } = useKarma();

  if (loading || !userStats) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Lädt...</div>
        </CardContent>
      </Card>
    );
  }

  const rankInfo = getRankInfo(userStats.rank);
  const nextRankProgress = calculateNextRankProgress();

  return (
    <div className="space-y-4">
      {/* Main Karma Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Karma-Punkte</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{userStats.karma_points}</div>
            <p className="text-xs text-muted-foreground">
              +{userStats.karma_points > 0 ? Math.floor(userStats.karma_points / 10) : 0} diese Woche
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash-Punkte</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.cash_points}</div>
            <p className="text-xs text-muted-foreground">
              ≈ {(userStats.cash_points / 100).toFixed(2)} €
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktueller Rang</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold capitalize ${rankInfo.color}`}>
              {rankInfo.name}
            </div>
            <p className="text-xs text-muted-foreground">
              Level {rankInfo.jobLevel} Jobs verfügbar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Good Deeds</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{userStats.good_deeds_completed}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.streak_days} Tage Streak
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rank Progress */}
      {showDetails && rankInfo.nextRank && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fortschritt zum nächsten Rang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={rankInfo.color}>
                  {rankInfo.name}
                </Badge>
                <span className="text-muted-foreground">→</span>
                <Badge variant="outline">
                  {getRankInfo(rankInfo.nextRank as any).name}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {nextRankProgress.progress.toFixed(0)}%
              </span>
            </div>
            
            <Progress value={nextRankProgress.progress} className="h-3" />
            
            <div className="text-sm text-muted-foreground">
              <p>Noch benötigt: {nextRankProgress.missing || 'Rang erreicht!'}</p>
              <p className="text-xs mt-1">
                Nächster Rang schaltet Level {getRankInfo(rankInfo.nextRank as any).jobLevel} Jobs frei
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Karma Conversion Info */}
      {showDetails && userStats.karma_points >= 100 && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Karma umwandeln
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Du kannst {Math.floor(userStats.karma_points / 100) * 100} Karma-Punkte in{' '}
              {Math.floor(userStats.karma_points / 100)} Cash-Punkte umwandeln.
            </p>
            <div className="text-xs text-muted-foreground">
              100 Karma = 1 Cash-Punkt = 0,01 €
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}