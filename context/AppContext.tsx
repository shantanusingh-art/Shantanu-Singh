
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HostingPlan, DomainResult } from '../types';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserResource {
  domains: { domain: string; expiry: string; price: number }[];
  hosting: { planId: string; status: 'active' | 'pending'; startDate: string } | null;
}

interface AppContextType {
  user: User | null;
  resources: UserResource;
  login: (email: string, name: string) => void;
  logout: () => void;
  purchaseDomain: (domain: DomainResult) => boolean;
  purchaseHosting: (planId: string) => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [resources, setResources] = useState<UserResource>({ domains: [], hosting: null });

  // Persistence logic
  useEffect(() => {
    const savedUser = localStorage.getItem('cloudswift_user');
    const savedResources = localStorage.getItem('cloudswift_resources');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedResources) setResources(JSON.parse(savedResources));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('cloudswift_user', JSON.stringify(user));
    else localStorage.removeItem('cloudswift_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cloudswift_resources', JSON.stringify(resources));
  }, [resources]);

  const login = (email: string, name: string) => {
    setUser({ id: Math.random().toString(36).substr(2, 9), email, name });
  };

  const logout = () => {
    setUser(null);
    setResources({ domains: [], hosting: null });
    localStorage.clear();
  };

  const purchaseDomain = (domain: DomainResult) => {
    if (!user) return false;
    const exists = resources.domains.some(d => d.domain === domain.domain);
    if (exists) return false;

    setResources(prev => ({
      ...prev,
      domains: [...prev.domains, { 
        domain: domain.domain, 
        price: domain.price, 
        expiry: new Date(Date.now() + 31536000000).toLocaleDateString() 
      }]
    }));
    return true;
  };

  const purchaseHosting = (planId: string) => {
    if (!user) return;
    setResources(prev => ({
      ...prev,
      hosting: { planId, status: 'active', startDate: new Date().toLocaleDateString() }
    }));
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      resources, 
      login, 
      logout, 
      purchaseDomain, 
      purchaseHosting, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
