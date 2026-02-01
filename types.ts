
export interface HostingPlan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
  recommended?: boolean;
  type: 'shared' | 'vps' | 'cloud' | 'dedicated';
  description: string;
}

export interface DomainResult {
  domain: string;
  extension: string;
  available: boolean;
  price: number;
}

export interface AdvisorRecommendation {
  planId: string;
  reason: string;
  suggestedAddons: string[];
  estimatedTrafficCapacity: string;
}
