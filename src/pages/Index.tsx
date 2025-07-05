
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSecureAuth } from '@/hooks/useSecureAuth';

const Index = () => {
  const { user, loading } = useSecureAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Laden...</div>
      </div>
    );
  }

  // Redirect authenticated users to dashboard, others to auth
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
};

export default Index;
