
import React, { useState } from 'react';
import { Sparkles, BrainCircuit, Rocket, Activity, CheckCircle2 } from 'lucide-react';
import { getHostingAdvice } from '../services/geminiService';
import { AdvisorRecommendation } from '../types';
import { HOSTING_PLANS } from '../constants';

const AIAdvisor: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AdvisorRecommendation | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || description.length < 10) return;
    
    setLoading(true);
    const result = await getHostingAdvice(description);
    setRecommendation(result);
    setLoading(false);
  };

  const recommendedPlan = HOSTING_PLANS.find(p => p.id === recommendation?.planId);

  return (
    <section id="advisor" className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-6">
              <Sparkles className="w-3 h-3" /> Powered by Gemini
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Not sure what you need? <br />
              <span className="text-indigo-600">Let our AI decide.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Describe your project—expected traffic, tech stack, or goal—and our 
              Hosting Advisor will analyze thousands of data points to recommend 
              the perfect infrastructure for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all min-h-[160px] text-slate-700"
                placeholder="E.g., I'm building a high-traffic e-commerce store using React and Node.js. I expect around 50k monthly visitors and need fast database performance."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing project...</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-5 h-5" />
                    <span>Get Smart Recommendation</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="relative">
            {!recommendation && !loading ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400">
                <Rocket className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Awaiting your project details...</p>
              </div>
            ) : loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-40 bg-slate-100 rounded-3xl"></div>
                <div className="h-20 bg-slate-100 rounded-2xl"></div>
                <div className="h-20 bg-slate-100 rounded-2xl"></div>
              </div>
            ) : (
              <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-200">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">AI Recommendation</h4>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Analysis Complete</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-100">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Recommended Plan</p>
                    <p className="text-2xl font-black text-indigo-600">{recommendedPlan?.name}</p>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed italic">
                      "{recommendation.reason}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Capacity</p>
                      <p className="text-sm font-bold text-slate-900">{recommendation.estimatedTrafficCapacity}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Savings</p>
                      <p className="text-sm font-bold text-emerald-600">Best Value</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-3">Add-on Suggestions</p>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.suggestedAddons.map(addon => (
                        <span key={addon} className="flex items-center gap-1.5 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> {addon}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
                    Apply Recommended Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
