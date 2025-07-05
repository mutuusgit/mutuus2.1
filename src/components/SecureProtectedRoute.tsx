
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
  maxSessionAge?: number; // in milliseconds
  requireEmailVerified?: boolean;
}

export function SecureProtectedRoute({ 
  children, 
  requiredAuth = true,
  maxSessionAge = 24 * 60 * 60 * 1000, // 24 hours
  requireEmailVerified = false
}: ProtectedRouteProps) {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [emailNotVerified, setEmailNotVerified] = useState(false);

  useEffect(() => {
    if (!loading && requiredAuth) {
      if (!user || !session) {
        navigate('/auth');
        return;
      }

      // Check email verification if required
      if (requireEmailVerified && !user.email_confirmed_at) {
        setEmailNotVerified(true);
        setTimeout(() => {
          navigate('/auth');
        }, 5000);
        return;
      }

      // Check session age and expiration
      if (session.expires_at) {
        const expiresAt = new Date(session.expires_at * 1000);
        const now = new Date();
        
        if (now >= expiresAt) {
          setSessionExpired(true);
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
          return;
        }
      }

      // Check if session is too old (additional security layer)
      const sessionCreatedAt = new Date(session.user.created_at);
      const now = new Date();
      
      if (now.getTime() - sessionCreatedAt.getTime() > maxSessionAge) {
        setSessionExpired(true);
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
        return;
      }

      // Security: Check for suspicious session activity
      const lastSignIn = session.user.last_sign_in_at;
      if (lastSignIn) {
        const lastSignInTime = new Date(lastSignIn);
        const timeSinceLastSignIn = now.getTime() - lastSignInTime.getTime();
        
        // If last sign-in was more than 7 days ago, require re-authentication
        if (timeSinceLastSignIn > 7 * 24 * 60 * 60 * 1000) {
          setSessionExpired(true);
          setTimeout(() => {
            navigate('/auth');
          }, 3000);
          return;
        }
      }
    }
  }, [user, session, loading, navigate, requiredAuth, maxSessionAge, requireEmailVerified]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            <span className="text-white">Authentifizierung wird überprüft...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (emailNotVerified) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 flex items-center space-x-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <div>
              <span className="text-white block">E-Mail-Bestätigung erforderlich.</span>
              <span className="text-gray-400 text-sm">Bitte bestätigen Sie Ihre E-Mail-Adresse...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionExpired) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 flex items-center space-x-4">
            <Shield className="w-6 h-6 text-red-400" />
            <div>
              <span className="text-white block">Sitzung abgelaufen.</span>
              <span className="text-gray-400 text-sm">Sie werden zur Anmeldung weitergeleitet...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requiredAuth && !user) {
    return null;
  }

  return <>{children}</>;
}
