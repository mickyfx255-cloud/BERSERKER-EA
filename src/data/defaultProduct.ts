import { Product } from '../types';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-berserker-scalp-ai',
    name: 'BERSERKER SCALP AI',
    brand: 'XTech Algo Trading',
    tagline: 'UNLEASH MARKET FURY. SCALE THROUGH VOLATILITY WITH SPEED.',
    description:
      'High-frequency precision scalping engine for XAUUSD (Gold). Executes rapid, fixed 0.08 lot entries with tight take-profits and strict hard stop protection across MT4 & MT5.',
    price: 299,
    currency: 'USD',
    active: true,
    featured: true,
    version: 'v3.2.0 (Dual MT4/MT5)',
    platform: 'MetaTrader 4 & MetaTrader 5 (MT4 & MT5)',
    min_deposit: 100,
    recommended_pairs: ['XAUUSD (Gold)', 'NAS100', 'US30', 'EURUSD'],
    timeframe: 'M1 / M5',
    image_url: '/src/assets/images/berserker_laptop_setup_1791797725326.jpg',
    pillars: [
      'Precision Entries',
      'Lightning Execution',
      'Drawdowns Locked Down',
      'AI Scalping Solution',
    ],
    badge: 'BUILT FOR VOLATILITY. ENGINEERED FOR PROFITS.',
  },
  {
    id: 'prod-snxperbot-adaptive-engine',
    name: 'SNXPERBOT ADAPTIVE ENGINE',
    brand: 'XTech Trades · Automate. Adapt. Outperform.',
    tagline: 'PRECISION AI SWING TRADING SYSTEM',
    description:
      'Adaptive mean reversion engine. Identifies market extremes and systematically scales positions (0.30 to 22.0 lots) on dip pullbacks, exiting at unified statistical take-profit targets across MT4 & MT5.',
    price: 349,
    currency: 'USD',
    active: true,
    featured: true,
    version: 'v4.1.0 (Dual MT4/MT5)',
    platform: 'MetaTrader 4 & MetaTrader 5 (MT4 & MT5)',
    min_deposit: 200,
    recommended_pairs: ['28 Forex Major & Minor Pairs', 'XAUUSD', 'GBPJPY', 'EURUSD'],
    timeframe: 'M15 / H1 / H4',
    image_url: '/src/assets/images/snxperbot_laptop_setup_1791797959703.jpg',
    pillars: [
      'AI Market Analysis (Structure Adaptation)',
      'Prop Firm Ready (Risk-Focused)',
      'Advanced Swing Trailing (TP & SL)',
      'Monitor Up to 28 Pairs Simultaneously',
    ],
    badge: 'PRECISION • PATIENCE • EXECUTION',
  },
];

export const DEFAULT_PRODUCT: Product = DEFAULT_PRODUCTS[0];
