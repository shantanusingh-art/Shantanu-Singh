
import { HostingPlan } from './types';

export const HOSTING_PLANS: HostingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Node',
    price: 1.99,
    billing: 'monthly',
    type: 'shared',
    description: 'Perfect for personal blogs and portfolios.',
    features: [
      '1 Website',
      '10GB SSD Storage',
      'Unmetered Bandwidth',
      'Free SSL Certificate',
      '24/7 Support'
    ]
  },
  {
    id: 'pro',
    name: 'Swift Pro',
    price: 4.99,
    billing: 'monthly',
    type: 'cloud',
    recommended: true,
    description: 'High performance for growing businesses.',
    features: [
      'Unlimited Websites',
      '100GB NVMe Storage',
      'Daily Backups',
      'Free Domain (1yr)',
      'Free Email Service',
      '99.9% Uptime Guarantee'
    ]
  },
  {
    id: 'enterprise',
    name: 'Scale Master',
    price: 12.99,
    billing: 'monthly',
    type: 'vps',
    description: 'Isolated resources for heavy-duty applications.',
    features: [
      'Dedicated IP',
      'Priority Support',
      'Staging Environment',
      'Auto-Scaling Resources',
      'Cloudflare Integration',
      'Global CDN'
    ]
  }
];

export const DOMAIN_EXTENSIONS = [
  { ext: '.com', price: 9.99 },
  { ext: '.net', price: 8.99 },
  { ext: '.org', price: 11.99 },
  { ext: '.io', price: 29.99 },
  { ext: '.ai', price: 59.99 },
  { ext: '.xyz', price: 0.99 },
  { ext: '.dev', price: 12.99 }
];
