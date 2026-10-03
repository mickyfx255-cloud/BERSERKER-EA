import { Product } from '../types';

export const DEFAULT_PRODUCT: Product = {
  id: 'prod-smart-scalper-ea',
  name: 'Smart Scalper EA',
  tagline: 'High-frequency algorithmic scalping engine for MetaTrader 5',
  description: 'Built for strict risk parameters, zero grid, zero martingale, with adaptive spread filtration, slippage minimization, and real-time equity preservation protection.',
  price: null, // Price coming soon
  currency: 'USD',
  active: true,
  featured: true,
  version: 'v2.4.1',
  platform: 'MT5',
  min_deposit: 100,
  recommended_pairs: ['XAUUSD (Gold)', 'EURUSD', 'GBPUSD', 'US30'],
  timeframe: 'M1 / M5',
};
