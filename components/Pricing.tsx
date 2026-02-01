
import React, { useState } from 'react';
import { Check, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HOSTING_PLANS } from '../constants';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';

const Pricing: React.FC = () => {
  const { isAuthenticated, purchaseHosting, resources } = useApp();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const handleSelect = (planId: string) => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }
    setPurchasing(planId);
    setTimeout(() => {
      purchaseHosting(planId);
      setPurchasing(null);
    }, 1000);
  };

  return (
    <section id="hosting" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-4">
            CloudSwift Plans
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Choose Your Hosting Power
          </h2>
          <p className="mt-4 text-xl text-slate-500">
            Scalable, reliable, and ridiculously affordable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {HOSTING_PLANS.map((plan) => {
            const isActive = resources.hosting?.planId === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col p-8 bg-white rounded-3xl shadow-xl transition-transform hover:-translate-y-2 duration-300 border-2 ${
                  plan.recommended ? 'border-indigo-500' : isActive ? 'border-emerald-500' : 'border-transparent'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active Plan
                  </div>
                )}
                {plan.recommended && !isActive && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm h-10">{plan.description}</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">${plan.price}</span>
                    <span className="ml-1 text-xl font-semibold text-slate-500">/mo</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-slate-600">
                      <Check className="w-5 h-5 text-indigo-500 shrink-0 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isActive || purchasing !== null}
                  onClick={() => handleSelect(plan.id)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : plan.recommended
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'
                      : 'bg-slate-900 text-white hover:bg-black'
                  }`}
                >
                  {purchasing === plan.id ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : isActive ? (
                    'Current Plan'
                  ) : (
                    'Select Plan'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 bg-indigo-900 rounded-3xl p-10 text-white shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-7 h-7" /> All plans include:
            </h3>
            <p className="text-indigo-200">30-day money-back guarantee, free site migration, and DDoS protection.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['No Setup Fees', 'Cancel Anytime', '24/7 Support'].map(text => (
              <span key={text} className="bg-indigo-800/50 px-4 py-2 rounded-lg text-sm border border-indigo-700">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </section>
  );
};

export default Pricing;
