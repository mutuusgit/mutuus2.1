
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
  maxSessionAge?: number; // in milliseconds
}

export function SecureProtectedRoute({ 
  children, 
  requiredAuth = true,
  maxSessionAge = 24 * 60 * 60 * 1000 // 24 hours
}: ProtectedRouteProps) {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (!loading && requiredAuth) {
      if (!user || !session) {
        navigate('/');
        return;
      }

      // Check session age
      if (session.expires_at) {
        const expiresAt = new Date(session.expires_at * 1000);
        const now = new Date();
        
        if (now >= expiresAt) {
          setSessionExpired(true);
          setTimeout(() => {
            navigate('/');
          }, 3000);
          return;
        }
      }

      // Check if session is too old
      const sessionCreatedAt = new Date(session.user.created_at);
      const now = new Date();
      
      if (now.getTime() - sessionCreatedAt.getTime() > maxSessionAge) {
        setSessionExpired(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
        return;
      }
    }
  }, [user, session, loading, navigate, requiredAuth, maxSessionAge]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            <span className="text-white">Lädt...</span>
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
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <div>
              <span className="text-white block">Ihre Sitzung ist abgelaufen.</span>
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
