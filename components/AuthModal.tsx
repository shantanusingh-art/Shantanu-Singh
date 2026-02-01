
import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.email, formData.name || 'Cloud Explorer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
          <X className="w-6 h-6" />
        </button>

        <div className="p-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 mb-8">
            {isLogin ? 'Enter your details to manage your cloud.' : 'Join 50k+ developers using CloudSwift.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
              {isLogin ? 'Log In' : 'Sign Up Free'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-bold hover:underline">
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
