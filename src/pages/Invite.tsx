
import React, { useState } from 'react';
import { Share, Copy, Mail, MessageCircle, Users, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useToast } from '@/hooks/use-toast';

const Invite = () => {
  const [email, setEmail] = useState('');
  const [invitesSent, setInvitesSent] = useState(3);
  const [bonusKarma, setBonusKarma] = useState(150);
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const inviteLink = `https://mutuus.app/invite?ref=user123`;
  const inviteMessage = `Hey! Schau dir Mutuus an - die App, die lokale Hilfe und Gemeinschaft verbindet. Mit meinem Link bekommst du 10 Bonus-Karma-Punkte! ${inviteLink}`;

  const referrals = [
    { id: 1, name: 'Anna M.', email: 'anna@email.com', status: 'accepted', joinDate: '2024-01-10', karmaEarned: 10 },
    { id: 2, name: 'Tom S.', email: 'tom@email.com', status: 'accepted', joinDate: '2024-01-08', karmaEarned: 10 },
    { id: 3, name: 'Lisa K.', email: 'lisa@email.com', status: 'pending', joinDate: null, karmaEarned: 0 },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast({
        title: "Link kopiert!",
        description: "Der Einladungslink wurde in die Zwischenablage kopiert.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Link konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  const sendEmailInvite = () => {
    if (!email) return;
    
    console.log('Einladung per E-Mail gesendet an:', email);
    setInvitesSent(prev => prev + 1);
    setEmail('');
    
    toast({
      title: "Einladung gesendet!",
      description: `Einladung wurde an ${email} gesendet.`,
    });
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareViaTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(inviteMessage)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Freunde einladen</h1>
            <p className="text-gray-400 text-lg">
              Teile Mutuus mit deinen Freunden und erhalte Bonus-Karma für jede erfolgreiche Anmeldung
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Invite Methods */}
            <div className="lg:col-span-2 space-y-6">
              {/* Share Link Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Share className="w-5 h-5 mr-2" />
                    Einladungslink teilen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={inviteLink}
                      readOnly
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button onClick={copyToClipboard} className="bg-blue-600 hover:bg-blue-700">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button 
                      onClick={shareViaWhatsApp}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      onClick={shareViaFacebook}
                      className="bg-blue-700 hover:bg-blue-800 text-white"
                    >
                      📘 Facebook
                    </Button>
                    <Button 
                      onClick={shareViaTwitter}
                      className="bg-sky-600 hover:bg-sky-700 text-white"
                    >
                      🐦 Twitter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Email Invite Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Per E-Mail einladen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="freund@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <Button 
                      onClick={sendEmailInvite}
                      disabled={!email}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Senden
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Referral History */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Deine Einladungen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {referrals.map((referral) => (
                      <div key={referral.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">{referral.name}</h4>
                          <p className="text-gray-400 text-sm">{referral.email}</p>
                          {referral.joinDate && (
                            <p className="text-gray-500 text-xs">Beigetreten: {referral.joinDate}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge 
                            className={referral.status === 'accepted' 
                              ? 'bg-green-600' 
                              : 'bg-yellow-600'
                            }
                          >
                            {referral.status === 'accepted' ? 'Angenommen' : 'Ausstehend'}
                          </Badge>
                          {referral.karmaEarned > 0 && (
                            <p className="text-green-400 text-sm mt-1">+{referral.karmaEarned} Karma</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats & Rewards */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Deine Statistiken
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">{invitesSent}</div>
                    <p className="text-gray-400 text-sm">Einladungen gesendet</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">{bonusKarma}</div>
                    <p className="text-gray-400 text-sm">Bonus-Karma erhalten</p>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {referrals.filter(r => r.status === 'accepted').length}
                    </div>
                    <p className="text-gray-400 text-sm">Erfolgreiche Einladungen</p>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Info */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Belohnungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-900/30 border border-green-800 rounded-lg">
                    <div className="flex items-center text-green-400 mb-1">
                      <span className="font-bold">10 Karma-Punkte</span>
                    </div>
                    <p className="text-gray-300 text-sm">für jede erfolgreiche Anmeldung</p>
                  </div>

                  <div className="p-3 bg-blue-900/30 border border-blue-800 rounded-lg">
                    <div className="flex items-center text-blue-400 mb-1">
                      <span className="font-bold">Bonus-Rabatt</span>
                    </div>
                    <p className="text-gray-300 text-sm">5% weniger Transaktionsgebühren</p>
                  </div>

                  <div className="p-3 bg-purple-900/30 border border-purple-800 rounded-lg">
                    <div className="flex items-center text-purple-400 mb-1">
                      <span className="font-bold">Exklusive Abzeichen</span>
                    </div>
                    <p className="text-gray-300 text-sm">für besonders aktive Einlader</p>
                  </div>
                </CardContent>
              </Card>

              {/* Challenge Card */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-700">
                <CardHeader>
                  <CardTitle className="text-white">🎯 Einladungs-Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm">
                      Lade 5 Freunde ein und erhalte das exklusive "Gemeinschafts-Builder" Abzeichen!
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(referrals.filter(r => r.status === 'accepted').length / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400 text-xs text-center">
                      {referrals.filter(r => r.status === 'accepted').length} / 5 Freunde
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Invite;
