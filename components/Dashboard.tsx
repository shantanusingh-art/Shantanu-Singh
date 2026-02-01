
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Server, Zap, HardDrive, BarChart3, ChevronRight, Globe2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HOSTING_PLANS } from '../constants';

const data = [
  { name: 'Mon', visits: 400 },
  { name: 'Tue', visits: 700 },
  { name: 'Wed', visits: 600 },
  { name: 'Thu', visits: 900 },
  { name: 'Fri', visits: 1200 },
  { name: 'Sat', visits: 1100 },
  { name: 'Sun', visits: 1400 },
];

const Dashboard: React.FC = () => {
  const { resources, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <section id="dashboard" className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-md mx-auto py-16 px-8 bg-slate-900 rounded-3xl border border-slate-800">
            <AlertCircle className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-slate-500 mb-8">Please log in or create an account to view your infrastructure dashboard.</p>
            <button className="bg-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-700">
              Go to Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  const activePlan = HOSTING_PLANS.find(p => p.id === resources.hosting?.planId);

  return (
    <section id="dashboard" className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">CloudSwift Control Panel</h2>
            <p className="text-slate-400">Manage your infrastructure with enterprise-grade tools.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700">
              Refresh Data
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-900/20">
              Launch Console
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all group">
                <div className="bg-indigo-500/10 p-2 rounded-xl w-fit mb-4 group-hover:bg-indigo-500/20">
                  <Server className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-slate-400 text-sm mb-1">Active Hosting</p>
                <p className="text-2xl font-bold">{activePlan?.name || 'None'}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all group">
                <div className="bg-blue-500/10 p-2 rounded-xl w-fit mb-4 group-hover:bg-blue-500/20">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-slate-400 text-sm mb-1">Status</p>
                <p className="text-2xl font-bold">{resources.hosting ? 'Online' : 'Inactive'}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-all group">
                <div className="bg-emerald-500/10 p-2 rounded-xl w-fit mb-4 group-hover:bg-emerald-500/20">
                  <HardDrive className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm mb-1">Domains Registered</p>
                <p className="text-2xl font-bold">{resources.domains.length}</p>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold">Traffic Overview (7 Days)</h3>
                </div>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#6366f1' }}
                    />
                    <Area type="monotone" dataKey="visits" stroke="#6366f1" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-indigo-400" /> Your Domains
              </h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {resources.domains.length > 0 ? (
                  resources.domains.map((item) => (
                    <div key={item.domain} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-slate-800 rounded-lg transition-all">
                      <div>
                        <p className="font-semibold text-sm">{item.domain}</p>
                        <p className="text-[10px] text-emerald-400 font-bold uppercase">Active</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-xs text-slate-600">No domains yet.</p>
                  </div>
                )}
              </div>
              <button className="w-full mt-8 py-3 bg-slate-800 text-xs font-bold rounded-xl hover:bg-slate-700 transition-colors">
                Manage All Domains
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-8 rounded-3xl border border-indigo-500/20">
              <h3 className="font-bold mb-2">Scaling Support</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">Your current infrastructure is optimized for current load. Need more power?</p>
              <a href="#hosting" className="block text-center w-full py-3 bg-indigo-600 rounded-xl font-bold text-sm shadow-xl shadow-indigo-900/40 hover:bg-indigo-700 transition-all">
                Scale Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
