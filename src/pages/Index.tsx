
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Index = () => {
  // For now, we'll show the dashboard directly
  // In a real app, this would check authentication and redirect accordingly
  return <Dashboard />;
};

export default Index;
