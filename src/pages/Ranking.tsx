
import React, { useState } from 'react';
import { Trophy, Star, TrendingUp, Crown, Medal, Award, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { DashboardHeader } from '@/components/DashboardHeader';

const Ranking = () => {
  const [activeTab, setActiveTab] = useState('karma');

  // Mock data for rankings
  const karmaRanking = [
    { id: 1, rank: 1, name: 'Anna Weber', avatar: '', karma: 2450, change: '+15', jobs_completed: 45 },
    { id: 2, rank: 2, name: 'Thomas Schmidt', avatar: '', karma: 2380, change: '+8', jobs_completed: 42 },
    { id: 3, rank: 3, name: 'Maria Müller', avatar: '', karma: 2250, change: '-2', jobs_completed: 38 },
    { id: 4, rank: 4, name: 'Peter Klein', avatar: '', karma: 2100, change: '+12', jobs_completed: 35 },
    { id: 5, rank: 5, name: 'Lisa Fischer', avatar: '', karma: 1980, change: '+5', jobs_completed: 33 },
    { id: 6, rank: 6, name: 'Du', avatar: '', karma: 1850, change: '+22', jobs_completed: 28, isCurrentUser: true },
  ];

  const earnedRanking = [
    { id: 1, rank: 1, name: 'Thomas Schmidt', avatar: '', earned: 1250.50, change: '+45.20', jobs_completed: 42 },
    { id: 2, rank: 2, name: 'Anna Weber', avatar: '', earned: 1180.75, change: '+32.10', jobs_completed: 45 },
    { id: 3, rank: 3, name: 'Peter Klein', avatar: '', earned: 980.25, change: '+28.50', jobs_completed: 35 },
    { id: 4, rank: 4, name: 'Maria Müller', avatar: '', earned: 875.00, change: '+15.75', jobs_completed: 38 },
    { id: 5, rank: 5, name: 'Du', avatar: '', earned: 750.25, change: '+42.80', jobs_completed: 28, isCurrentUser: true },
    { id: 6, rank: 6, name: 'Lisa Fischer', avatar: '', earned: 690.50, change: '+18.30', jobs_completed: 33 },
  ];

  const achievements = [
    { id: 1, name: 'Erste Schritte', description: '5 Jobs abgeschlossen', icon: '🎯', progress: 100, total: 5 },
    { id: 2, name: 'Hilfsbereit', description: '25 Good Deeds erledigt', icon: '❤️', progress: 80, total: 25 },
    { id: 3, name: 'Vertrauenswürdig', description: '4.8 Sterne Durchschnitt', icon: '⭐', progress: 96, total: 5 },
    { id: 4, name: 'Schnellhelfer', description: '10 Jobs in einer Woche', icon: '⚡', progress: 60, total: 10 },
    { id: 5, name: 'Stammkunde', description: '50 Jobs abgeschlossen', icon: '🏆', progress: 56, total: 50 },
    { id: 6, name: 'Top Verdiener', description: '500€ verdient', icon: '💰', progress: 85, total: 500 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default:
        return 'bg-gray-600';
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-500';
    if (change.startsWith('-')) return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Rangliste</h1>
          <p className="text-gray-400">Sehen Sie, wie Sie im Vergleich zu anderen Nutzern abschneiden</p>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-yellow-600 to-yellow-700 border-yellow-500 text-white animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Dein Karma Rang</p>
                  <p className="text-3xl font-bold">#6</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 border-green-500 text-white animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Karma Punkte</p>
                  <p className="text-3xl font-bold">1,850</p>
                </div>
                <Star className="w-8 h-8 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500 text-white animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Verdienst Rang</p>
                  <p className="text-3xl font-bold">#5</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-purple-500 text-white animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Abgeschlossene Jobs</p>
                  <p className="text-3xl font-bold">28</p>
                </div>
                <Target className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger value="karma" className="data-[state=active]:bg-blue-600">
              <Star className="w-4 h-4 mr-2" />
              Karma Rangliste
            </TabsTrigger>
            <TabsTrigger value="earned" className="data-[state=active]:bg-blue-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Verdienst Rangliste
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-600">
              <Trophy className="w-4 h-4 mr-2" />
              Erfolge
            </TabsTrigger>
          </TabsList>

          {/* Karma Ranking */}
          <TabsContent value="karma" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Karma Rangliste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {karmaRanking.map((user, index) => (
                    <div 
                      key={user.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 animate-fade-in ${
                        user.isCurrentUser 
                          ? 'bg-blue-600/20 border border-blue-500' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(user.rank)}`}>
                          {getRankIcon(user.rank)}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gray-600 text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className={`font-medium ${user.isCurrentUser ? 'text-blue-300' : 'text-white'}`}>
                            {user.name}
                          </p>
                          <p className="text-gray-400 text-sm">{user.jobs_completed} Jobs abgeschlossen</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-500">{user.karma.toLocaleString()}</p>
                        <p className={`text-sm ${getChangeColor(user.change)}`}>
                          {user.change} diese Woche
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earned Ranking */}
          <TabsContent value="earned" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Verdienst Rangliste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earnedRanking.map((user, index) => (
                    <div 
                      key={user.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 animate-fade-in ${
                        user.isCurrentUser 
                          ? 'bg-blue-600/20 border border-blue-500' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(user.rank)}`}>
                          {getRankIcon(user.rank)}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gray-600 text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className={`font-medium ${user.isCurrentUser ? 'text-blue-300' : 'text-white'}`}>
                            {user.name}
                          </p>
                          <p className="text-gray-400 text-sm">{user.jobs_completed} Jobs abgeschlossen</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-500">{user.earned.toFixed(2)}€</p>
                        <p className={`text-sm ${getChangeColor(user.change)}`}>
                          {user.change}€ diese Woche
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card 
                  key={achievement.id}
                  className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-lg text-white">{achievement.name}</CardTitle>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Fortschritt</span>
                        <span className="text-white">
                          {achievement.progress === 100 ? achievement.total : Math.floor((achievement.progress / 100) * achievement.total)} / {achievement.total}
                        </span>
                      </div>
                      <Progress 
                        value={achievement.progress} 
                        className="h-2"
                      />
                      {achievement.progress === 100 && (
                        <Badge className="bg-green-600 text-white">
                          <Trophy className="w-3 h-3 mr-1" />
                          Erreicht!
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Ranking;
