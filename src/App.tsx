
import { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecureAuthProvider } from "@/hooks/useSecureAuth";
import { SecureProtectedRoute } from "@/components/SecureProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Map from "./pages/Map";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Invite from "./pages/Invite";
import Wallet from "./pages/Wallet";
import MyJobs from "./pages/MyJobs";
import Ranking from "./pages/Ranking";
import Tutorial from "./pages/Tutorial";
import TutorialLesson from "./pages/TutorialLesson";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SecureAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={
                <SecureProtectedRoute>
                  <Dashboard />
                </SecureProtectedRoute>
              } />
              <Route path="/map" element={
                <SecureProtectedRoute>
                  <Map />
                </SecureProtectedRoute>
              } />
              <Route path="/jobs" element={
                <SecureProtectedRoute>
                  <Jobs />
                </SecureProtectedRoute>
              } />
              <Route path="/profile" element={
                <SecureProtectedRoute>
                  <Profile />
                </SecureProtectedRoute>
              } />
              <Route path="/invite" element={
                <SecureProtectedRoute>
                  <Invite />
                </SecureProtectedRoute>
              } />
              <Route path="/wallet" element={
                <SecureProtectedRoute>
                  <Wallet />
                </SecureProtectedRoute>
              } />
              <Route path="/my-jobs" element={
                <SecureProtectedRoute>
                  <MyJobs />
                </SecureProtectedRoute>
              } />
              <Route path="/ranking" element={
                <SecureProtectedRoute>
                  <Ranking />
                </SecureProtectedRoute>
              } />
              <Route path="/tutorial" element={
                <SecureProtectedRoute>
                  <Tutorial />
                </SecureProtectedRoute>
              } />
              <Route path="/tutorial/:categoryId/:lessonId" element={
                <SecureProtectedRoute>
                  <TutorialLesson />
                </SecureProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SecureAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
