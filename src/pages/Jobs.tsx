import React, { useState } from 'react';
import { Plus, Filter, Search, MapPin, Clock, Euro, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DashboardHeader } from '@/components/DashboardHeader';
import { CreateJobModal } from '@/components/CreateJobModal';
import { TutorialHint } from '@/components/TutorialHint';

const Jobs = () => {
  const [viewMode, setViewMode] = useState<'find' | 'create'>('find');
  const [jobType, setJobType] = useState<'all' | 'good_deeds' | 'kein_bock'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showTutorialHint, setShowTutorialHint] = useState(true);

  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: "Einkaufen für Senioren",
      description: "Wöchentlicher Einkauf für ältere Nachbarin. Benötige jemanden, der geduldig ist und beim Tragen hilft.",
      category: "Einkaufen",
      type: "good_deeds",
      karma: 50,
      location: "Neuss Zentrum",
      distance: "2.3 km",
      duration: 120,
      creator: "Maria S.",
      rating: 4.8,
      images: [],
      created_at: "2024-01-15"
    },
    {
      id: 2,
      title: "Garten für Frühjahr vorbereiten",
      description: "Unkraut entfernen, Beete umgraben und neue Pflanzen setzen. Gartenwerkzeug vorhanden.",
      category: "Garten",
      type: "kein_bock",
      budget: 45,
      location: "Düsseldorf-Bilk",
      distance: "5.1 km",
      duration: 180,
      creator: "Thomas M.",
      rating: 4.9,
      images: [],
      created_at: "2024-01-14"
    },
    {
      id: 3,
      title: "Computer einrichten",
      description: "Neuen Laptop einrichten, Software installieren und Daten übertragen.",
      category: "Technik",
      type: "kein_bock",
      budget: 35,
      location: "Köln-Ehrenfeld",
      distance: "8.7 km",
      duration: 90,
      creator: "Anna K.",
      rating: 4.7,
      images: [],
      created_at: "2024-01-13"
    },
    {
      id: 4,
      title: "Hund ausführen",
      description: "Regelmäßiges Gassi gehen mit freundlichem Golden Retriever. Perfekt für Hundeliebhaber!",
      category: "Haustiere",
      type: "good_deeds",
      karma: 30,
      location: "Neuss-Furth",
      distance: "3.2 km",
      duration: 60,
      creator: "Peter L.",
      rating: 4.6,
      images: [],
      created_at: "2024-01-12"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    if (jobType === 'all') return true;
    return job.type === jobType;
  });

  const handleCreateJob = (jobData: any) => {
    console.log('Neuer Job erstellt:', jobData);
    setIsCreateModalOpen(false);
  };

  const handleApplyForJob = (jobId: number) => {
    console.log('Bewerbung für Job:', jobId);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        {/* Tutorial Hint */}
        {showTutorialHint && (
          <TutorialHint
            title="Neu bei der Jobsuche?"
            description="Lernen Sie, wie Sie die besten Jobs finden und erfolgreich abschließen."
            tutorialLink="/tutorial/job-system/finding-jobs"
            tips={[
              "Nutzen Sie Filter für bessere Ergebnisse",
              "Lesen Sie Bewertungen der Auftraggeber",
              "Starten Sie mit Jobs in Ihrer Nähe"
            ]}
            onDismiss={() => setShowTutorialHint(false)}
          />
        )}

        {/* Header with Mode Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Jobs</h1>
            <p className="text-gray-400">Finden Sie passende Aufgaben oder erstellen Sie neue</p>
          </div>
          
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button
              variant={viewMode === 'find' ? 'default' : 'outline'}
              onClick={() => setViewMode('find')}
              className="bg-gray-800 border-gray-700"
            >
              Jobs finden
            </Button>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Job erstellen
                </Button>
              </DialogTrigger>
              <CreateJobModal onSubmit={handleCreateJob} />
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Jobs suchen..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Erweiterte Filter
            </Button>
          </div>

          {/* Job Type Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={jobType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setJobType('all')}
              className="bg-gray-800 border-gray-700"
            >
              Alle Jobs ({jobs.length})
            </Button>
            <Button
              variant={jobType === 'good_deeds' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setJobType('good_deeds')}
              className="bg-green-600 hover:bg-green-700 border-green-600"
            >
              <Heart className="w-3 h-3 mr-1" />
              Good Deeds ({jobs.filter(j => j.type === 'good_deeds').length})
            </Button>
            <Button
              variant={jobType === 'kein_bock' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setJobType('kein_bock')}
              className="bg-blue-600 hover:bg-blue-700 border-blue-600"
            >
              <Euro className="w-3 h-3 mr-1" />
              KeinBock ({jobs.filter(j => j.type === 'kein_bock').length})
            </Button>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-white leading-tight">
                    {job.title}
                  </CardTitle>
                  <Badge 
                    className={job.type === 'good_deeds' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                    }
                  >
                    {job.type === 'good_deeds' ? 'Good Deed' : 'KeinBock'}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="font-medium">{job.creator}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{job.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location} • {job.distance}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    ca. {job.duration} Minuten
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {job.category}
                  </Badge>
                  <div className="text-right">
                    {job.type === 'good_deeds' ? (
                      <div className="flex items-center text-green-400 font-semibold">
                        <Zap className="w-4 h-4 mr-1" />
                        <span>{job.karma} Karma</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-blue-400 font-semibold">
                        <Euro className="w-4 h-4 mr-1" />
                        <span>{job.budget}€</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleApplyForJob(job.id)}
                >
                  Job annehmen
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Keine Jobs gefunden</h3>
            <p className="text-gray-400 mb-6">
              Versuchen Sie andere Filter oder erstellen Sie einen neuen Job
            </p>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ersten Job erstellen
                </Button>
              </DialogTrigger>
              <CreateJobModal onSubmit={handleCreateJob} />
            </Dialog>
          </div>
        )}
      </main>
    </div>
  );
};

export default Jobs;
