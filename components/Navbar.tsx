
import React, { useState } from 'react';
import { Cloud, Globe, Cpu, User, Menu, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useApp();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Cloud className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                CloudSwift
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <a href="#domains" className="hover:text-indigo-600 transition-colors">Domains</a>
              <a href="#hosting" className="hover:text-indigo-600 transition-colors">Hosting</a>
              <a href="#advisor" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                <Cpu className="w-4 h-4" /> AI Advisor
              </a>
              {isAuthenticated && (
                <a href="#dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</a>
              )}
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <User className="w-4 h-4" />
                    </div>
                    <span>{user?.name}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setIsAuthOpen(true)}
                    className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-indigo-600"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => setIsAuthOpen(true)}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                  >
                    Get Started
                  </button>
                </>
              )}
              <button className="md:hidden">
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;
