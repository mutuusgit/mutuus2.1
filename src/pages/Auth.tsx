
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp, resetPassword, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(formData.email, formData.password);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwörter stimmen nicht überein');
      return;
    }
    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
      });
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      alert('Bitte geben Sie Ihre E-Mail-Adresse ein');
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(formData.email);
      setShowForgotPassword(false);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 scroll-fade-in">
          <img 
            src="/lovable-uploads/297ee6c8-01e0-4f29-ab9c-61eef3186daf.png" 
            alt="Mutuus" 
            className="h-16 w-auto mx-auto mb-4 floating glow-blue"
          />
          <h1 className="text-3xl font-bold text-white text-glow">Willkommen bei Mutuus</h1>
          <p className="text-gray-400 mt-2">Die Community für gegenseitige Hilfe</p>
        </div>

        <Card className="bg-gray-800 border-gray-700 card-futuristic glow-blue scroll-scale-in">
          <CardHeader>
            <CardTitle className="text-center text-white">
              Anmelden oder Registrieren
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showForgotPassword ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Passwort zurücksetzen</h3>
                  <p className="text-gray-400 text-sm">Geben Sie Ihre E-Mail-Adresse ein, um einen Reset-Link zu erhalten.</p>
                </div>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email" className="text-white">E-Mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="reset-email"
                        name="email"
                        type="email"
                        placeholder="ihre@email.de"
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full btn-futuristic glow-blue hover-lift"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Wird gesendet...' : 'Reset-Link senden'}
                    </Button>
                    <Button 
                      type="button"
                      variant="ghost"
                      className="w-full text-gray-400 hover:text-white"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Zurück zur Anmeldung
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                  <TabsTrigger value="signin" className="text-white">Anmelden</TabsTrigger>
                  <TabsTrigger value="signup" className="text-white">Registrieren</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">E-Mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ihre@email.de"
                          className="pl-10 bg-gray-700 border-gray-600 text-white"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Passwort</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Ihr Passwort"
                          className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        type="submit" 
                        className="w-full btn-futuristic glow-blue hover-lift"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
                      </Button>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="w-full text-sm text-gray-400 hover:text-white underline"
                      >
                        Passwort vergessen?
                      </button>
                    </div>
                  </form>
                </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">Vorname</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Max"
                          className="pl-10 bg-gray-700 border-gray-600 text-white"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">Nachname</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Mustermann"
                        className="bg-gray-700 border-gray-600 text-white"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white">E-Mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="ihre@email.de"
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white">Passwort</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mindestens 6 Zeichen"
                        className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">Passwort bestätigen</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Passwort wiederholen"
                        className="pl-10 bg-gray-700 border-gray-600 text-white"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-futuristic glow-green hover-lift"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Wird registriert...' : 'Registrieren'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-gray-400 text-sm mt-6 scroll-fade-in delay-300">
          Mit der Registrierung stimmen Sie unseren Nutzungsbedingungen zu.
        </p>
      </div>
    </div>
  );
};

export default Auth;
