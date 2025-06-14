
import React, { useState } from 'react';
import { Plus, Calendar, FolderOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { DashboardHeader } from '@/components/DashboardHeader';

// Mock data - will be replaced with Supabase data
const mockProjects = [
  { id: 1, user_id: "user-123", name: "Website Redesign", status: "active", description: "Complete overhaul of company website", due_date: "2024-07-15" },
  { id: 2, user_id: "user-123", name: "API Integration", status: "archived", description: "Integrate third-party APIs", due_date: "2024-06-30" },
  { id: 3, user_id: "user-123", name: "Mobile App Development", status: "active", description: "Build React Native mobile app", due_date: "2024-08-20" },
  { id: 4, user_id: "user-123", name: "Database Migration", status: "active", description: "Migrate to new database system", due_date: "2024-07-01" },
];

const Dashboard = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateProject = (projectData: any) => {
    const newProject = {
      id: projects.length + 1,
      user_id: "user-123",
      ...projectData,
      status: "active"
    };
    setProjects([...projects, newProject]);
    setIsCreateModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: "bg-green-500 hover:bg-green-600 text-white glow-green",
      archived: "bg-gray-600 hover:bg-gray-700 text-white"
    };
    
    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles] || statusStyles.active}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Title and Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 scroll-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 text-glow">Dashboard</h1>
            <p className="text-gray-400">Verwalten Sie Ihre Projekte und Aufgaben</p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0 btn-futuristic glow-blue hover-lift">
                <Plus className="w-4 h-4 mr-2" />
                Neues Projekt
              </Button>
            </DialogTrigger>
            <CreateProjectModal onSubmit={handleCreateProject} />
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700 card-futuristic hover-lift glow-blue scroll-slide-left delay-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Aktive Projekte</p>
                  <p className="text-3xl font-bold text-white text-glow">
                    {projects.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="bg-blue-600 p-3 rounded-full floating glow-blue">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 card-futuristic hover-lift glow-green scroll-slide-left delay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamt Projekte</p>
                  <p className="text-3xl font-bold text-white text-glow-green">{projects.length}</p>
                </div>
                <div className="bg-green-600 p-3 rounded-full floating glow-green">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 card-futuristic hover-lift glow-orange scroll-slide-left delay-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Streak</p>
                  <p className="text-3xl font-bold text-white">7</p>
                </div>
                <div className="bg-orange-600 p-3 rounded-full floating glow-orange pulse-glow">
                  <span className="text-white text-xl">🔥</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 card-futuristic hover-lift glow-purple scroll-slide-left delay-400">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Verdienst</p>
                  <p className="text-3xl font-bold text-white text-glow-purple">5.00€</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-full floating glow-purple">
                  <span className="text-white text-xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={project.id} className={`bg-gray-800 border-gray-700 card-futuristic hover-lift glow-blue scroll-scale-in delay-${(index + 1) * 100}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-white leading-tight hover-glow">
                    {project.name}
                  </CardTitle>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              <CardContent>
                {project.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}
                {project.due_date && (
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    Fällig: {formatDate(project.due_date)}
                  </div>
                )}
                <div className="pt-4 border-t border-gray-700">
                  <Button variant="outline" size="sm" className="w-full btn-futuristic hover-lift">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Projekt öffnen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12 scroll-fade-in">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4 floating" />
            <h3 className="text-lg font-medium text-white mb-2">Keine Projekte gefunden</h3>
            <p className="text-gray-400 mb-6">Erstellen Sie Ihr erstes Projekt, um loszulegen</p>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="btn-futuristic glow-blue hover-lift">
                  <Plus className="w-4 h-4 mr-2" />
                  Erstes Projekt erstellen
                </Button>
              </DialogTrigger>
              <CreateProjectModal onSubmit={handleCreateProject} />
            </Dialog>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
