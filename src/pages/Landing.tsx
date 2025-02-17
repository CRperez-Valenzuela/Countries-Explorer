import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-black"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }}
    >
      <div className="bg-slate-900/90 backdrop-blur-sm p-8 rounded-lg shadow-xl text-center max-w-lg mx-4 border border-slate-700">
        <div className="flex justify-center mb-6">
          <Globe className="w-16 h-16 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-slate-100 mb-4">
          Welcome to Countries Explorer
        </h1>
        <p className="text-lg text-slate-300 mb-8">
          Discover countries around the world, explore their details, and create amazing tourist activities.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}