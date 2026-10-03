import { Product } from '../types';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-berserker-scalp-ai',
    name: 'BERSERKER SCALP AI',
    brand: 'XTech Algo Trading',
    tagline: 'UNLEASH MARKET FURY. SCALE THROUGH VOLATILITY WITH SPEED.',
    description:
      'Stop trading defense. Deploy high-velocity AI designed to multiply capital with hard drawdown limits. Built for volatility, engineered for profits on MetaTrader 5.',
    price: null, // Custom institutional quote / License key via desk
    currency: 'USD',
    active: true,
    featured: true,
    version: 'v3.2.0',
    platform: 'MetaTrader 5 (MT5)',
    min_deposit: 100,
    recommended_pairs: ['XAUUSD (Gold)', 'NAS100', 'US30', 'EURUSD'],
    timeframe: 'M1 / M5',
    image_url: '/src/assets/images/berserker_scalp_box_1791064523648.jpg',
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
      'Plug & Play full control engine with AI market structure adaptation. Monitors up to 28 pairs at a time with advanced swing trailing TP & SL. Prop firm ready risk-focused execution.',
    price: null, // Custom institutional quote / License key via desk
    currency: 'USD',
    active: true,
    featured: true,
    version: 'v4.1.0',
    platform: 'MetaTrader 5 (MT5)',
    min_deposit: 200,
    recommended_pairs: ['28 Forex Major & Minor Pairs', 'XAUUSD', 'GBPJPY', 'EURUSD'],
    timeframe: 'M15 / H1 / H4',
    image_url: '/src/assets/images/snxperbot_adaptive_box_1791064534614.jpg',
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
