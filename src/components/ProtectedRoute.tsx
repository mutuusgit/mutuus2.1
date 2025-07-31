
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🛡️ ProtectedRoute check - loading:', loading, 'user:', user?.id, 'session:', !!session);
    
    if (!loading && (!user || !session)) {
      console.log('🔄 Redirecting to login - user:', user?.id, 'session exists:', !!session);
      navigate('/', { replace: true });
    } else if (!loading && user && session) {
      console.log('✅ User authenticated, staying on protected route');
    }
  }, [user, session, loading, navigate]);

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

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
