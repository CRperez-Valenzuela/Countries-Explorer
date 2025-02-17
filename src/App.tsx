import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Landing } from './pages/Landing';
import { AuthForm } from './components/AuthForm';
import { Home } from './pages/Home';
import { CountryDetail } from './pages/CountryDetail';
import { Globe } from 'lucide-react';

function App() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin text-gray-600">
          <Globe className="w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/country/:id"
        element={user ? <CountryDetail /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/auth"
        element={!user ? <AuthForm /> : <Navigate to="/home" replace />}
      />
    </Routes>
  );
}

export default App