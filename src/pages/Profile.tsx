
import React, { useState } from 'react';
import { User, Star, MapPin, Phone, Mail, Edit, Trophy, Zap, Euro, Heart, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from '@/components/DashboardHeader';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max.mustermann@email.com',
    phone: '+49 123 456789',
    location: 'Neuss, Deutschland',
    bio: 'Hilfe gerne bei Gartenarbeiten und technischen Problemen. Verfügbar an Wochenenden.',
    avatar: null
  });

  // Mock data
  const userStats = {
    karmaPoints: 250,
    level: 3,
    totalEarned: 156.50,
    jobsCompleted: 12,
    rating: 4.8,
    reviewsCount: 15
  };

  const achievements = [
    { id: 1, name: 'Erste Hilfe', description: 'Erste Good Deed abgeschlossen', icon: '🌟', earned: true },
    { id: 2, name: 'Helfer', description: '10 Good Deeds abgeschlossen', icon: '🏆', earned: true },
    { id: 3, name: 'Karma-Meister', description: '500 Karma-Punkte gesammelt', icon: '👑', earned: false },
    { id: 4, name: 'Erstes Geld', description: 'Ersten bezahlten Job abgeschlossen', icon: '💰', earned: true },
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Einkaufen für Senioren',
      type: 'good_deeds',
      karma: 50,
      date: '2024-01-15',
      rating: 5,
      review: 'Sehr hilfsbereit und pünktlich!'
    },
    {
      id: 2,
      title: 'Garten umgraben',
      type: 'kein_bock',
      payment: 45,
      date: '2024-01-12',
      rating: 5,
      review: 'Perfekte Arbeit, gerne wieder!'
    },
    {
      id: 3,
      title: 'Computer einrichten',
      type: 'kein_bock',
      payment: 35,
      date: '2024-01-08',
      rating: 4,
      review: 'Schnell und kompetent'
    }
  ];

  const favorites = [
    { id: 1, name: 'Maria S.', type: 'Auftraggeber', jobs: 3, rating: 4.9 },
    { id: 2, name: 'Thomas M.', type: 'Auftraggeber', jobs: 2, rating: 4.7 },
  ];

  const handleSave = () => {
    console.log('Profil gespeichert:', profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="text-center">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center">
                    {profileData.avatar ? (
                      <img src={profileData.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-2">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <CardTitle className="text-white">
                  {profileData.firstName} {profileData.lastName}
                </CardTitle>
                <div className="flex items-center justify-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white">{userStats.rating}</span>
                  <span className="text-gray-400">({userStats.reviewsCount} Bewertungen)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Vorname"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Nachname"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Input
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="E-Mail"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Telefon"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Input
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Standort"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Bio"
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Speichern
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Abbrechen
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">{profileData.email}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">{profileData.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{profileData.location}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{profileData.bio}</p>
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Bearbeiten
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Statistiken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-green-400 mb-1">
                      <Zap className="w-4 h-4 mr-1" />
                      <span className="font-bold text-lg">{userStats.karmaPoints}</span>
                    </div>
                    <p className="text-gray-400 text-xs">Karma-Punkte</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-400 mb-1">
                      <Euro className="w-4 h-4 mr-1" />
                      <span className="font-bold text-lg">{userStats.totalEarned}€</span>
                    </div>
                    <p className="text-gray-400 text-xs">Verdient</p>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold text-lg mb-1">{userStats.jobsCompleted}</div>
                    <p className="text-gray-400 text-xs">Jobs abgeschlossen</p>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold text-lg mb-1">Level {userStats.level}</div>
                    <p className="text-gray-400 text-xs">Aktuelles Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
                <TabsTrigger value="jobs" className="text-gray-300">Jobs</TabsTrigger>
                <TabsTrigger value="achievements" className="text-gray-300">Erfolge</TabsTrigger>
                <TabsTrigger value="reviews" className="text-gray-300">Bewertungen</TabsTrigger>
                <TabsTrigger value="favorites" className="text-gray-300">Favoriten</TabsTrigger>
              </TabsList>

              <TabsContent value="jobs" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Abgeschlossene Jobs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{job.title}</h4>
                          <Badge 
                            className={job.type === 'good_deeds' 
                              ? 'bg-green-600' 
                              : 'bg-blue-600'
                            }
                          >
                            {job.type === 'good_deeds' ? (
                              <><Heart className="w-3 h-3 mr-1" /> {job.karma} Karma</>
                            ) : (
                              <><Euro className="w-3 h-3 mr-1" /> {job.payment}€</>
                            )}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-400">{job.date}</span>
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            <span>{job.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mt-2">{job.review}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Erfolge & Abzeichen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div 
                          key={achievement.id}
                          className={`p-4 rounded-lg border ${
                            achievement.earned 
                              ? 'bg-gray-700 border-yellow-600' 
                              : 'bg-gray-800 border-gray-600 opacity-50'
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-3">{achievement.icon}</span>
                            <div>
                              <h4 className="text-white font-medium">{achievement.name}</h4>
                              {achievement.earned && (
                                <Badge className="bg-yellow-600 text-xs">Erhalten</Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Bewertungen ({userStats.reviewsCount})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{job.title}</h4>
                          <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            <span>{job.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{job.review}</p>
                        <span className="text-gray-400 text-xs">{job.date}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Favoriten</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {favorites.map((favorite) => (
                      <div key={favorite.id} className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-white font-medium">{favorite.name}</h4>
                            <p className="text-gray-400 text-sm">{favorite.type} • {favorite.jobs} Jobs</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-yellow-400 mb-1">
                              <Star className="w-4 h-4 fill-current mr-1" />
                              <span>{favorite.rating}</span>
                            </div>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                              Entfernen
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
