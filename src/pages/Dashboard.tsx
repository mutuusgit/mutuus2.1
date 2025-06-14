
import React, { useState } from 'react';
import { Plus, Calendar, Settings, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
      active: "bg-green-500 hover:bg-green-600 text-white",
      archived: "bg-gray-500 hover:bg-gray-600 text-white"
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
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Title and Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Verwalten Sie Ihre Projekte und Aufgaben</p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Neues Projekt
              </Button>
            </DialogTrigger>
            <CreateProjectModal onSubmit={handleCreateProject} />
          </Dialog>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                    {project.name}
                  </CardTitle>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              <CardContent>
                {project.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}
                {project.due_date && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Fällig: {formatDate(project.due_date)}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="w-full">
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
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Projekte gefunden</h3>
            <p className="text-gray-600 mb-6">Erstellen Sie Ihr erstes Projekt, um loszulegen</p>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
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
