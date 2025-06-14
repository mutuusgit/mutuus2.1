
import React, { useState } from 'react';
import { MapPin, Filter, Search, Heart, Euro, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/DashboardHeader';

const Map = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [filters, setFilters] = useState({
    radius: 10,
    category: 'all',
    jobType: 'all'
  });

  // Mock data for jobs on map
  const mapJobs = [
    {
      id: 1,
      title: "Einkaufen für Senioren",
      type: "good_deeds",
      karma: 50,
      location: "Neuss Zentrum",
      distance: "2.3 km",
      category: "Einkaufen",
      description: "Wöchentlicher Einkauf für ältere Nachbarin",
      creator: "Maria S.",
      position: { lat: 51.1979, lng: 6.6847 }
    },
    {
      id: 2,
      title: "Garten umgraben",
      type: "kein_bock",
      budget: 45,
      location: "Düsseldorf-Bilk",
      distance: "5.1 km",
      category: "Garten",
      description: "Kleinen Garten für Frühjahr vorbereiten",
      creator: "Thomas M.",
      position: { lat: 51.2099, lng: 6.7947 }
    },
    {
      id: 3,
      title: "Umzugshilfe",
      type: "kein_bock",
      budget: 80,
      location: "Köln-Ehrenfeld",
      distance: "8.7 km",
      category: "Transport",
      description: "Hilfe beim Transport von Möbeln",
      creator: "Lisa K.",
      position: { lat: 50.9475, lng: 6.9583 }
    }
  ];

  const categories = [
    { value: 'all', label: 'Alle Kategorien' },
    { value: 'haushalt', label: 'Haushalt' },
    { value: 'garten', label: 'Garten' },
    { value: 'einkaufen', label: 'Einkaufen' },
    { value: 'transport', label: 'Transport' },
    { value: 'technik', label: 'Technik' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Jobs in der Nähe suchen..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters.jobType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, jobType: 'all' }))}
              className="bg-gray-800 border-gray-700"
            >
              Alle
            </Button>
            <Button
              variant={filters.jobType === 'good_deeds' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, jobType: 'good_deeds' }))}
              className="bg-green-600 hover:bg-green-700 border-green-600"
            >
              <Heart className="w-3 h-3 mr-1" />
              Good Deeds
            </Button>
            <Button
              variant={filters.jobType === 'kein_bock' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, jobType: 'kein_bock' }))}
              className="bg-blue-600 hover:bg-blue-700 border-blue-600"
            >
              <Euro className="w-3 h-3 mr-1" />
              KeinBock
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700 h-[600px]">
              <CardContent className="p-0 h-full">
                <div className="relative h-full bg-gray-700 rounded-lg overflow-hidden">
                  {/* Placeholder for actual map */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Karte wird hier angezeigt</p>
                      <p className="text-gray-500 text-sm">Google Maps Integration</p>
                    </div>
                  </div>

                  {/* Mock Job Pins */}
                  {mapJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`absolute w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                        job.type === 'good_deeds' ? 'bg-green-600' : 'bg-blue-600'
                      } flex items-center justify-center`}
                      style={{
                        left: `${20 + job.id * 15}%`,
                        top: `${30 + job.id * 10}%`
                      }}
                      onClick={() => setSelectedJob(job)}
                    >
                      {job.type === 'good_deeds' ? (
                        <Heart className="w-4 h-4 text-white" />
                      ) : (
                        <Euro className="w-4 h-4 text-white" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Details Sidebar */}
          <div className="space-y-4">
            {selectedJob ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-lg">{selectedJob.title}</CardTitle>
                    <Badge 
                      className={selectedJob.type === 'good_deeds' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                      }
                    >
                      {selectedJob.type === 'good_deeds' ? 'Good Deed' : 'KeinBock'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{selectedJob.location} • {selectedJob.distance}</span>
                  </div>

                  <p className="text-gray-300">{selectedJob.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Von: {selectedJob.creator}</span>
                    <div className="text-right">
                      {selectedJob.type === 'good_deeds' ? (
                        <div className="flex items-center text-green-400">
                          <Zap className="w-4 h-4 mr-1" />
                          <span>{selectedJob.karma} Karma</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-blue-400">
                          <Euro className="w-4 h-4 mr-1" />
                          <span>{selectedJob.budget}€</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Job annehmen
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Wählen Sie einen Job auf der Karte aus</p>
                </CardContent>
              </Card>
            )}

            {/* Nearby Jobs List */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Jobs in der Nähe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mapJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedJob?.id === job.id 
                        ? 'bg-gray-700 border border-blue-600' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{job.title}</h4>
                      <Badge 
                        size="sm"
                        className={job.type === 'good_deeds' 
                          ? 'bg-green-600' 
                          : 'bg-blue-600'
                        }
                      >
                        {job.type === 'good_deeds' ? job.karma + ' ⚡' : job.budget + '€'}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{job.distance}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Map;
