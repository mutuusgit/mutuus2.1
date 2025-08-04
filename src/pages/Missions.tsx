import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMissions } from '@/hooks/useMissions';
import { useKarma } from '@/hooks/useKarma';
import { Camera, Clock, Award, CheckCircle, XCircle } from 'lucide-react';

export default function Missions() {
  const { missions, userMissions, loading, completeMission, uploadMissionPhoto, getMissionTypeIcon, getMissionTypeColor } = useMissions();
  const { userStats } = useKarma();
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMissionComplete = async () => {
    if (!selectedMission) return;

    setIsSubmitting(true);
    try {
      let photoUrl = undefined;
      
      if (selectedMission.photo_required && photoFile) {
        photoUrl = await uploadMissionPhoto(photoFile);
        if (!photoUrl) {
          setIsSubmitting(false);
          return;
        }
      }

      await completeMission(selectedMission.id, photoUrl);
      setSelectedMission(null);
      setPhotoFile(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhotoFile(event.target.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Lädt...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Missionen</h1>
          <p className="text-muted-foreground">
            Vervollständige Missionen, um Karma-Punkte zu verdienen und deinen Rang zu verbessern.
          </p>
        </div>

        {/* User Stats Overview */}
        {userStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Karma-Punkte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{userStats.karma_points}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Good Deeds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{userStats.good_deeds_completed}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Aktueller Rang</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 capitalize">{userStats.rank}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available">Verfügbare Missionen</TabsTrigger>
            <TabsTrigger value="completed">Abgeschlossene Missionen</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {missions.map((mission) => (
                <Card key={mission.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getMissionTypeIcon(mission.mission_type)}</span>
                        <div>
                          <CardTitle className="text-lg">{mission.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {mission.karma_reward} Karma-Punkte
                          </CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={mission.can_complete ? "default" : "secondary"}
                        className={getMissionTypeColor(mission.mission_type)}
                      >
                        {mission.mission_type === 'good_deed' ? 'Good Deed' :
                         mission.mission_type === 'social_challenge' ? 'Social' :
                         mission.mission_type === 'tutorial' ? 'Tutorial' : 'Einladung'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{mission.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {mission.completions_this_week}/{mission.max_completions_per_week} diese Woche
                      </span>
                    </div>
                    
                    <Progress 
                      value={(mission.completions_this_week / mission.max_completions_per_week) * 100} 
                      className="h-2"
                    />

                    {mission.photo_required && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Camera className="w-4 h-4" />
                        <span>Foto erforderlich</span>
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          disabled={!mission.can_complete || mission.completed_today}
                          onClick={() => setSelectedMission(mission)}
                        >
                          {mission.completed_today ? 'Heute abgeschlossen' :
                           !mission.can_complete ? 'Wochenlimit erreicht' : 'Mission starten'}
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{selectedMission?.title}</DialogTitle>
                          <DialogDescription>
                            {selectedMission?.description}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            <span>{selectedMission?.karma_reward} Karma-Punkte</span>
                          </div>

                          {selectedMission?.photo_required && (
                            <div className="space-y-2">
                              <Label htmlFor="photo">Foto hochladen *</Label>
                              <Input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                              />
                            </div>
                          )}
                        </div>

                        <DialogFooter>
                          <Button
                            onClick={handleMissionComplete}
                            disabled={isSubmitting || (selectedMission?.photo_required && !photoFile)}
                          >
                            {isSubmitting ? 'Wird verarbeitet...' : 'Mission abschließen'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="space-y-4">
              {userMissions.map((userMission) => (
                <Card key={userMission.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {userMission.mission ? getMissionTypeIcon(userMission.mission.mission_type) : '⭐'}
                        </span>
                        <div>
                          <h3 className="font-medium">
                            {userMission.mission?.title || 'Mission'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Abgeschlossen am {new Date(userMission.completed_at).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          +{userMission.karma_awarded} Karma
                        </Badge>
                        
                        {userMission.verification_status === 'approved' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {userMission.verification_status === 'rejected' && (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        {userMission.verification_status === 'pending' && (
                          <Clock className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    
                    {userMission.photo_url && (
                      <div className="mt-4">
                        <img 
                          src={userMission.photo_url} 
                          alt="Mission Foto" 
                          className="w-full max-w-md h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {userMissions.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      Du hast noch keine Missionen abgeschlossen.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}