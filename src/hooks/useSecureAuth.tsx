
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { signInSchema, signUpSchema, rateLimiter } from '@/lib/validation';
import { z } from 'zod';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: { first_name?: string; last_name?: string; }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  loginAttempts: number;
  isLocked: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SecureAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Log authentication events securely
        console.log(`Auth event: ${event}`, { 
          timestamp: new Date().toISOString(),
          userId: session?.user?.id ? '[REDACTED]' : 'none'
        });

        if (event === 'SIGNED_IN' && session?.user) {
          // Reset login attempts on successful login
          setLoginAttempts(0);
          setIsLocked(false);
          
          // Update user streak on login
          setTimeout(() => {
            supabase.rpc('update_user_streak', { user_id: session.user.id });
          }, 0);

          // Log successful login
          setTimeout(() => {
            supabase
              .from('activity_log')
              .insert({
                user_id: session.user.id,
                action: 'user_login',
                description: 'User successfully logged in',
                metadata: { timestamp: new Date().toISOString() },
              });
          }, 0);
        }

        if (event === 'SIGNED_OUT') {
          // Log logout securely
          console.log('User signed out', { timestamp: new Date().toISOString() });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Validate input
      const validatedData = signInSchema.parse({ email, password });
      
      // Check rate limiting
      const clientId = `login_${validatedData.email}`;
      if (!rateLimiter.isAllowed(clientId, 5, 15 * 60 * 1000)) {
        const remainingTime = Math.ceil(rateLimiter.getRemainingTime(clientId) / (60 * 1000));
        setIsLocked(true);
        throw new Error(`Zu viele Anmeldeversuche. Versuchen Sie es in ${remainingTime} Minuten erneut.`);
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        setLoginAttempts(prev => prev + 1);
        
        // Generic error message to prevent information disclosure
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Ungültige E-Mail oder Passwort. Bitte überprüfen Sie Ihre Eingaben.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Bitte bestätigen Sie Ihre E-Mail-Adresse vor der Anmeldung.');
        } else {
          throw new Error('Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        }
      }

      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen zurück!",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Eingabefehler",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: { first_name?: string; last_name?: string; } = {}) => {
    try {
      // Validate input
      const validatedData = signUpSchema.parse({
        email,
        password,
        confirmPassword: password,
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
      });

      // Check rate limiting
      const clientId = `signup_${validatedData.email}`;
      if (!rateLimiter.isAllowed(clientId, 3, 60 * 60 * 1000)) {
        throw new Error('Zu viele Registrierungsversuche. Versuchen Sie es später erneut.');
      }

      const { error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
          },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          throw new Error('Ein Konto mit dieser E-Mail existiert bereits. Bitte melden Sie sich stattdessen an.');
        } else {
          throw new Error('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        }
      }

      toast({
        title: "Registrierung erfolgreich",
        description: "Bitte bestätigen Sie Ihre E-Mail-Adresse.",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Eingabefehler",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registrierung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Reset security state
      setLoginAttempts(0);
      setIsLocked(false);
      
      toast({
        title: "Erfolgreich abgemeldet",
        description: "Bis bald!",
      });
    } catch (error: any) {
      toast({
        title: "Abmeldung fehlgeschlagen",
        description: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (data: any) => {
    try {
      if (!user) throw new Error('Kein Benutzer angemeldet');
      
      // Validate and sanitize profile data
      const sanitizedData = Object.keys(data).reduce((acc, key) => {
        if (typeof data[key] === 'string') {
          acc[key] = data[key].trim().substring(0, 255); // Limit string length
        } else {
          acc[key] = data[key];
        }
        return acc;
      }, {} as any);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...sanitizedData,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      toast({
        title: "Profil aktualisiert",
        description: "Ihre Änderungen wurden gespeichert.",
      });
    } catch (error: any) {
      toast({
        title: "Aktualisierung fehlgeschlagen",
        description: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    loginAttempts,
    isLocked,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSecureAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSecureAuth must be used within a SecureAuthProvider');
  }
  return context;
}
