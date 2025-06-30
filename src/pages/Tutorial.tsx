
import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, CheckCircle, BookOpen, Users, Map, Briefcase, Trophy, Wallet, Gift, Star, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useNavigate } from 'react-router-dom';
import { useTutorial } from '@/hooks/useTutorial';

const Tutorial = () => {
  const navigate = useNavigate();
  const { progress, isLessonCompleted, getTotalXP, getCompletedLessonsCount } = useTutorial();

  const tutorialCategories = [
    {
      id: 'getting-started',
      title: 'Erste Schritte',
      description: 'Grundlagen der App verstehen',
      icon: BookOpen,
      color: 'bg-blue-600',
      lessons: [
        {
          id: 'dashboard-basics',
          title: 'Dashboard Overview',
          description: 'Lernen Sie die Grundfunktionen des Dashboards kennen',
          duration: '5 Min',
          xp: 50
        },
        {
          id: 'profile-setup',
          title: 'Profil einrichten',
          description: 'Vervollständigen Sie Ihr Profil für bessere Jobs',
          duration: '10 Min',
          xp: 100
        },
        {
          id: 'first-steps',
          title: 'Erste Aktionen',
          description: 'Machen Sie Ihre ersten Schritte in der Community',
          duration: '8 Min',
          xp: 75
        }
      ]
    },
    {
      id: 'job-system',
      title: 'Job System',
      description: 'Jobs finden und erfolgreich abschließen',
      icon: Briefcase,
      color: 'bg-green-600',
      lessons: [
        {
          id: 'finding-jobs',
          title: 'Jobs finden',
          description: 'Strategien zum Finden der besten Jobs für Sie',
          duration: '12 Min',
          xp: 150
        },
        {
          id: 'job-application',
          title: 'Bewerbung optimieren',
          description: 'Wie Sie sich erfolgreich auf Jobs bewerben',
          duration: '15 Min',
          xp: 200
        },
        {
          id: 'job-completion',
          title: 'Jobs erfolgreich abschließen',
          description: 'Best Practices für hohe Bewertungen',
          duration: '10 Min',
          xp: 125
        }
      ]
    },
    {
      id: 'karma-system',
      title: 'Karma & Leveling',
      description: 'Verstehen Sie das Belohnungssystem',
      icon: Star,
      color: 'bg-purple-600',
      lessons: [
        {
          id: 'karma-basics',
          title: 'Karma verstehen',
          description: 'Wie das Karma-System funktioniert',
          duration: '7 Min',
          xp: 100
        },
        {
          id: 'level-up-strategies',
          title: 'Level-Up Strategien',
          description: 'Effektive Wege zum schnellen Aufstieg',
          duration: '20 Min',
          xp: 300
        },
        {
          id: 'good-deeds',
          title: 'Good Deeds Mastery',
          description: 'Maximieren Sie Ihren Karma-Gewinn',
          duration: '12 Min',
          xp: 175
        }
      ]
    },
    {
      id: 'community',
      title: 'Community Features',
      description: 'Networking und soziale Funktionen',
      icon: Users,
      color: 'bg-orange-600',
      lessons: [
        {
          id: 'networking',
          title: 'Networking Basics',
          description: 'Kontakte knüpfen und pflegen',
          duration: '15 Min',
          xp: 150
        },
        {
          id: 'invite-system',
          title: 'Einladungssystem nutzen',
          description: 'Freunde einladen und Boni erhalten',
          duration: '8 Min',
          xp: 100
        },
        {
          id: 'ranking-system',
          title: 'Ranking verstehen',
          description: 'Wie das Ranking-System funktioniert',
          duration: '10 Min',
          xp: 125
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Fortgeschrittene Tipps',
      description: 'Profi-Strategien für Experten',
      icon: Target,
      color: 'bg-red-600',
      lessons: [
        {
          id: 'wallet-management',
          title: 'Wallet Management',
          description: 'Optimale Verwaltung Ihrer Earnings',
          duration: '18 Min',
          xp: 250
        },
        {
          id: 'map-features',
          title: 'Karten-Features nutzen',
          description: 'Erweiterte Kartenfunktionen entdecken',
          duration: '12 Min',
          xp: 150
        },
        {
          id: 'efficiency-hacks',
          title: 'Effizienz-Hacks',
          description: 'Geheime Tipps der Top-User',
          duration: '25 Min',
          xp: 400
        }
      ]
    }
  ];

  const totalLessons = tutorialCategories.reduce((acc, cat) => acc + cat.lessons.length, 0);
  const completedCount = getCompletedLessonsCount();
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const handleStartLesson = (categoryId: string, lessonId: string) => {
    navigate(`/tutorial/${categoryId}/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8 scroll-fade-in">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-400 mr-3 floating" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 text-glow">Mutuus Campus</h1>
              <p className="text-gray-400">Lernen Sie, wie Sie die App optimal nutzen und Ihr Profil erfolgreich aufleveln</p>
            </div>
          </div>
          
          {/* Progress Overview */}
          <Card className="bg-gray-800 border-gray-700 card-futuristic hover-lift glow-blue">
            <CardHeader>
              <CardTitle className="text-white flex items-center hover-glow">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400 floating" />
                Ihr Lernfortschritt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Abgeschlossene Lektionen</span>
                    <span className="text-white font-medium">{completedCount}/{totalLessons}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 glow-blue" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center scroll-slide-left delay-100">
                    <div className="text-2xl font-bold text-blue-400 floating">{completedCount}</div>
                    <div className="text-sm text-gray-400">Lektionen</div>
                  </div>
                  <div className="text-center scroll-slide-left delay-200">
                    <div className="text-2xl font-bold text-green-400 floating">
                      {getTotalXP()}
                    </div>
                    <div className="text-sm text-gray-400">XP Earned</div>
                  </div>
                  <div className="text-center scroll-slide-left delay-300">
                    <div className="text-2xl font-bold text-purple-400 floating">
                      {Math.floor(progressPercentage)}%
                    </div>
                    <div className="text-sm text-gray-400">Fortschritt</div>
                  </div>
                  <div className="text-center scroll-slide-left delay-400">
                    <div className="text-2xl font-bold text-orange-400 floating">
                      {tutorialCategories.length}
                    </div>
                    <div className="text-sm text-gray-400">Kategorien</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tutorial Categories */}
        <div className="space-y-8">
          {tutorialCategories.map((category, categoryIndex) => (
            <div key={category.id} className={`space-y-4 scroll-fade-in delay-${categoryIndex * 100}`}>
              <div className="flex items-center hover-lift">
                <div className={`p-3 rounded-lg ${category.color} mr-4 glow-${category.color.split('-')[1]} floating`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white text-glow">{category.title}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.lessons.map((lesson, index) => {
                  const completed = isLessonCompleted(lesson.id);
                  return (
                    <Card 
                      key={lesson.id} 
                      className={`bg-gray-800 border-gray-700 card-futuristic hover-lift cursor-pointer scroll-scale-in delay-${index * 100} ${
                        completed ? 'glow-green' : 'glow-blue'
                      }`}
                      onClick={() => handleStartLesson(category.id, lesson.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-semibold text-white leading-tight hover-glow">
                            {lesson.title}
                          </CardTitle>
                          {completed && (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2 floating" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 text-sm mb-4">
                          {lesson.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="border-gray-600 text-gray-300 hover-lift">
                            {lesson.duration}
                          </Badge>
                          <div className="flex items-center text-yellow-400 floating">
                            <Star className="w-4 h-4 mr-1" />
                            <span className="text-sm font-medium">{lesson.xp} XP</span>
                          </div>
                        </div>

                        <Button 
                          className={`w-full btn-futuristic hover-lift ${
                            completed 
                              ? 'bg-green-600 hover:bg-green-700 glow-green' 
                              : 'bg-blue-600 hover:bg-blue-700 glow-blue'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartLesson(category.id, lesson.id);
                          }}
                        >
                          {completed ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Nochmal ansehen
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Lektion starten
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="bg-gray-800 border-gray-700 card-futuristic hover-lift glow-blue mt-8 scroll-fade-in delay-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center hover-glow">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-400 floating" />
              Schnelle Tipps für den Erfolg
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 scroll-slide-left delay-100">
                <h3 className="font-semibold text-white text-glow">💡 Tägliche Routine</h3>
                <p className="text-gray-400 text-sm">Loggen Sie sich täglich ein und schauen Sie nach neuen Jobs in Ihrer Nähe.</p>
              </div>
              <div className="space-y-2 scroll-slide-left delay-200">
                <h3 className="font-semibold text-white text-glow">⭐ Qualität vor Quantität</h3>
                <p className="text-gray-400 text-sm">Konzentrieren Sie sich auf hochwertige Jobs für bessere Bewertungen.</p>
              </div>
              <div className="space-y-2 scroll-slide-left delay-300">
                <h3 className="font-semibold text-white text-glow">🤝 Community Building</h3>
                <p className="text-gray-400 text-sm">Laden Sie Freunde ein und bauen Sie Ihr Netzwerk auf.</p>
              </div>
              <div className="space-y-2 scroll-slide-left delay-400">
                <h3 className="font-semibold text-white text-glow">📈 Kontinuierliches Lernen</h3>
                <p className="text-gray-400 text-sm">Nutzen Sie den Campus regelmäßig für neue Strategien.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Tutorial;
