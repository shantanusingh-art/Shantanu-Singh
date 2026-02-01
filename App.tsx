
import React from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import DomainSearch from './components/DomainSearch';
import Pricing from './components/Pricing';
import AIAdvisor from './components/AIAdvisor';
import Dashboard from './components/Dashboard';
import { Rocket, Zap, Globe, Shield, Star, PlayCircle } from 'lucide-react';

const Main: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-100 opacity-30 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-100 opacity-20 blur-[80px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">New: Global Edge CDN Included Free</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
            High Performance Hosting <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
              For Pennies a Day.
            </span>
          </h1>

          <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 animate-in fade-in duration-1000">
            Stop overpaying for your cloud infrastructure. Join 50,000+ developers 
            who trust CloudSwift for lightning-fast domains and scalable hosting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto px-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" /> Start Your Journey
            </button>
            <button className="w-full sm:w-auto px-8 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5 text-indigo-600" /> Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-bold text-2xl tracking-tighter italic">TECH CORP</span>
            <span className="font-bold text-2xl tracking-tighter italic">VIBE STUDIO</span>
            <span className="font-bold text-2xl tracking-tighter italic">NEXUS AI</span>
            <span className="font-bold text-2xl tracking-tighter italic">CLOUD.LY</span>
            <span className="font-bold text-2xl tracking-tighter italic">FLUX</span>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <Zap className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">99.9% Uptime</h3>
              <p className="text-sm text-slate-500">Tier-3 data centers ensuring your business stays online 24/7/365.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <Shield className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Free SSL</h3>
              <p className="text-sm text-slate-500">Every domain and site comes with auto-renewing SSL certificates.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <Globe className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Any Domain</h3>
              <p className="text-sm text-slate-500">Over 500+ extensions supported at wholesale registration prices.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <Star className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Expert AI</h3>
              <p className="text-sm text-slate-500">Gemini-powered advisor to help you optimize costs and performance.</p>
            </div>
          </div>
        </div>
      </section>

      <DomainSearch />
      <AIAdvisor />
      <Pricing />
      <Dashboard />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="bg-indigo-600 p-1.5 rounded-md">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900">CloudSwift</span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-10">
            The world's fastest-growing low-cost cloud provider. Helping the next billion internet creators build their dreams.
          </p>
          <div className="flex justify-center gap-8 mb-10 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Status</a>
            <a href="#" className="hover:text-indigo-600">Support</a>
            <a href="#" className="hover:text-indigo-600">Twitter</a>
          </div>
          <p className="text-slate-400 text-xs">
            © 2024 CloudSwift Hosting Solutions. Built for speed.
          </p>
        </div>
      </footer>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
