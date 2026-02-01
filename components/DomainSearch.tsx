
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, ShoppingCart, Loader2, Check } from 'lucide-react';
import { DOMAIN_EXTENSIONS } from '../constants';
import { DomainResult } from '../types';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';

const DomainSearch: React.FC = () => {
  const { isAuthenticated, purchaseDomain, resources } = useApp();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [lastPurchased, setLastPurchased] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setTimeout(() => {
      const base = query.split('.')[0].toLowerCase();
      const newResults: DomainResult[] = DOMAIN_EXTENSIONS.map(ext => ({
        domain: base + ext.ext,
        extension: ext.ext,
        price: ext.price,
        available: Math.random() > 0.3 && !resources.domains.some(d => d.domain === base + ext.ext)
      }));
      setResults(newResults);
      setLoading(false);
    }, 800);
  };

  const handleBuy = (res: DomainResult) => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }

    const success = purchaseDomain(res);
    if (success) {
      setLastPurchased(res.domain);
      setTimeout(() => setLastPurchased(null), 3000);
    }
  };

  return (
    <section id="domains" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
          Find Your Perfect Domain
        </h2>
        <p className="text-slate-500 mb-10 max-w-2xl mx-auto">
          Secure your online identity today with our ultra-low-cost registration services. 
          Check availability instantly.
        </p>

        <form onSubmit={handleSearch} className="relative flex items-center mb-12 shadow-2xl rounded-2xl overflow-hidden border-4 border-slate-50">
          <div className="absolute left-6 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            placeholder="Search your domain name (e.g. mysite)"
            className="w-full py-6 pl-16 pr-32 text-lg focus:outline-none bg-slate-50/50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
          </button>
        </form>

        {results.length > 0 && (
          <div className="grid gap-4 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            {results.map((res) => {
              const alreadyOwned = resources.domains.some(d => d.domain === res.domain);
              return (
                <div key={res.domain} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-3">
                    {res.available && !alreadyOwned ? (
                      <CheckCircle className="text-emerald-500 w-5 h-5" />
                    ) : (
                      <XCircle className="text-rose-500 w-5 h-5" />
                    )}
                    <div>
                      <p className="font-bold text-slate-800">{res.domain}</p>
                      <p className="text-xs text-slate-400">
                        {alreadyOwned ? 'Owned by you' : res.available ? 'Available' : 'Taken'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold text-indigo-600">${res.price}</p>
                      <p className="text-xs text-slate-400">per year</p>
                    </div>
                    <button
                      disabled={!res.available || alreadyOwned}
                      onClick={() => handleBuy(res)}
                      className={`p-2 rounded-lg transition-all flex items-center gap-2 px-4 ${
                        lastPurchased === res.domain
                          ? 'bg-emerald-500 text-white'
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed'
                      }`}
                    >
                      {lastPurchased === res.domain ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span className="text-xs font-bold uppercase">Bought!</span>
                        </>
                      ) : (
                        <ShoppingCart className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </section>
  );
};

export default DomainSearch;
