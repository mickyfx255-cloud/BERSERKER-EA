import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-Memory Database with optional persistence file
const DATA_FILE = path.resolve(process.cwd(), '.app_data.json');

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number | null; // null represents "Price coming soon"
  currency: string;
  active: boolean;
  featured: boolean;
  version: string;
  platform: string;
  min_deposit: number;
  recommended_pairs: string[];
  timeframe: string;
}

interface Order {
  id: string;
  user_email: string;
  user_name: string;
  product_id: string;
  product_name: string;
  amount: number | null;
  currency: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  mt5_account?: string;
  notes?: string;
}

interface BotResult {
  id: string;
  user_email: string;
  user_name: string;
  account_number: string;
  broker: string;
  symbol: string;
  trades_count: number;
  win_rate: number;
  open_pnl: number;
  total_profit: number;
  last_trade_time: string;
  status: 'active' | 'paused' | 'standby';
}

interface License {
  id: string;
  buyer_email: string;
  buyer_name: string;
  license_key: string;
  mt5_account: string | null;
  status: 'active' | 'disabled';
  duration_type: 'days' | 'months';
  duration_value: number;
  created_at: string;
  expires_at: string;
  last_check_at: string | null;
}

interface EASource {
  id: string;
  name: string;
  code: string;
  version: string;
  updated_at: string;
}

const DEFAULT_MQ5_TEMPLATE = `//+------------------------------------------------------------------+
//|                                              Smart Scalper EA.mq5|
//|                                  Copyright 2026, EA ALGO COMMUNITY|
//|                                              https://wa.me/255610366248 |
//+------------------------------------------------------------------+
#property copyright "EA ALGO COMMUNITY"
#property link      "https://wa.me/255610366248"
#property version   "1.00"
#property strict

//--- Inputs
input string   InpLicenseKey    = "SSEA-XXXXXX-XXXXXX-XXXXXX-XXXXXX"; // License Key
input double   InpLotSize       = 0.01;                               // Fixed Lot Size
input int      InpStopLoss      = 35;                                 // Stop Loss (Points)
input int      InpTakeProfit    = 50;                                 // Take Profit (Points)
input int      InpTrailingStop  = 20;                                 // Trailing Stop (Points)
input int      InpMagicNumber   = 882910;                             // Magic Number
input bool     InpUseAutoRisk   = false;                              // Dynamic Risk Calculation
input double   InpRiskPercent   = 1.0;                                // Risk Percent per trade

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   Print("Initializing Smart Scalper EA by EA ALGO COMMUNITY...");
   
   // Verify MT5 WebRequest license if configured
   if(!CheckLicense(InpLicenseKey, AccountInfoInteger(ACCOUNT_LOGIN)))
   {
      Alert("[FATAL] Smart Scalper EA: License verification failed or expired!");
      return(INIT_FAILED);
   }

   Print("Smart Scalper EA successfully authenticated and active.");
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   Print("Smart Scalper EA stopped. Reason: ", reason);
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   // Algorithmic execution logic goes here...
}
`;

function loadData() {
  const initialData = {
    products: [
      {
        id: 'prod-smart-scalper-01',
        name: 'Smart Scalper EA',
        tagline: 'Precision High-Frequency MT5 Execution Robot',
        description: 'Automated algorithmic trading system built exclusively for MetaTrader 5. Features proprietary dynamic micro-trend detection, sub-millisecond execution logic, and automated strict risk ceiling controls.',
        price: null, // "Price coming soon" initially until set by admin
        currency: 'USD',
        active: true,
        featured: true,
        version: 'v2.4.1',
        platform: 'MetaTrader 5 (MT5)',
        min_deposit: 100,
        recommended_pairs: ['EURUSD', 'XAUUSD', 'GBPUSD', 'NAS100'],
        timeframe: 'M1 / M5',
      },
    ] as Product[],
    orders: [
      {
        id: 'ORD-89410',
        user_email: 'trader.alex@gmail.com',
        user_name: 'Alexandre Dubois',
        product_id: 'prod-smart-scalper-01',
        product_name: 'Smart Scalper EA',
        amount: null,
        currency: 'USD',
        status: 'pending' as const,
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        mt5_account: '51092834',
        notes: 'Inquired via WhatsApp for VIP bundle',
      },
      {
        id: 'ORD-89402',
        user_email: 'j.mwamba@yahoo.com',
        user_name: 'Joseph Mwamba',
        product_id: 'prod-smart-scalper-01',
        product_name: 'Smart Scalper EA',
        amount: 250,
        currency: 'USD',
        status: 'completed' as const,
        created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
        mt5_account: '89102431',
        notes: 'Setup completed on IC Markets Raw Spread',
      }
    ] as Order[],
    bot_results: [
      {
        id: 'res-1',
        user_email: 'j.mwamba@yahoo.com',
        user_name: 'Joseph Mwamba',
        account_number: '89102431',
        broker: 'IC Markets',
        symbol: 'XAUUSD',
        trades_count: 84,
        win_rate: 78.5,
        open_pnl: 42.10,
        total_profit: 348.60,
        last_trade_time: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        status: 'active' as const,
      },
      {
        id: 'res-2',
        user_email: 'rashid.k@gmail.com',
        user_name: 'Rashid K.',
        account_number: '7729104',
        broker: 'Exness Pro',
        symbol: 'EURUSD',
        trades_count: 142,
        win_rate: 81.2,
        open_pnl: 18.50,
        total_profit: 612.00,
        last_trade_time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        status: 'active' as const,
      },
      {
        id: 'res-3',
        user_email: 'marcus.t@outlook.com',
        user_name: 'Marcus Thorne',
        account_number: '9940129',
        broker: 'RoboForex ECN',
        symbol: 'NAS100',
        trades_count: 67,
        win_rate: 76.1,
        open_pnl: -12.40,
        total_profit: 420.80,
        last_trade_time: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        status: 'active' as const,
      },
    ] as BotResult[],
    licenses: [
      {
        id: 'lic-1',
        buyer_email: 'j.mwamba@yahoo.com',
        buyer_name: 'Joseph Mwamba',
        license_key: 'SSEA-A7F291-C8419B-94E012-3D1488',
        mt5_account: '89102431',
        status: 'active' as const,
        duration_type: 'months' as const,
        duration_value: 3,
        created_at: new Date(Date.now() - 3600000 * 24 * 15).toISOString(),
        expires_at: new Date(Date.now() + 3600000 * 24 * 75).toISOString(),
        last_check_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      },
      {
        id: 'lic-2',
        buyer_email: 'rashid.k@gmail.com',
        buyer_name: 'Rashid K.',
        license_key: 'SSEA-4B991C-01EF83-AA3401-BC7712',
        mt5_account: '7729104',
        status: 'active' as const,
        duration_type: 'days' as const,
        duration_value: 30,
        created_at: new Date(Date.now() - 3600000 * 24 * 26).toISOString(),
        expires_at: new Date(Date.now() + 3600000 * 24 * 4).toISOString(), // <= 5 days remaining for warning highlight!
        last_check_at: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
      },
    ] as License[],
    ea_sources: [
      {
        id: 'src-1',
        name: 'Smart Scalper EA v2.4.1 (Stable)',
        code: DEFAULT_MQ5_TEMPLATE,
        version: 'v2.4.1',
        updated_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      },
    ] as EASource[],
  };

  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return { ...initialData, ...parsed };
    }
  } catch {
    // fallback to initial
  }
  return initialData;
}

let db = loadData();

function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

// Helper function to generate hex license key: SSEA-XXXXXX-XXXXXX-XXXXXX-XXXXXX
function generateHexKey(): string {
  const hexPart = () => Math.random().toString(16).substring(2, 8).toUpperCase().padEnd(6, '0');
  return `SSEA-${hexPart()}-${hexPart()}-${hexPart()}-${hexPart()}`;
}

// ================= API ROUTES =================

// 1. AI Advisor endpoint (Server-side Gemini with @google/genai)
app.post('/api/advisor/chat', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!apiKey) {
      res.json({
        reply: "Welcome to EA ALGO COMMUNITY! Our algorithmic trading systems are optimized for MetaTrader 5 with strict risk parameters. Note: For live deployment, licensing, and VIP pool account access, connect directly with our support team on WhatsApp at +255 610 366 248 or email Mickybonny9@gmail.com.\n\n*Risk Warning: Trading forex and CFDs carries a high level of risk to your capital.*"
      });
      return;
    }

    const systemInstruction = `You are the official Smart Scalper EA AI Advisor for EA ALGO COMMUNITY.
Your role is to answer questions about currency trading (major pairs like EURUSD, GBPUSD, gold XAUUSD, indices like NAS100), algorithmic execution principles, technical patterns (scalping momentum, order blocks, micro-trends), MT5 Expert Advisor installation/setup, and trading psychology.

CRITICAL RULES:
1. Provide concise, clear, structured markdown responses.
2. NEVER invent real-time market prices, live quotes, or past exact performance percentages that are not verifiable.
3. NEVER promise profits or guarantee financial returns under any circumstances.
4. ALWAYS conclude with a transparent risk reminder:
   "⚠️ *Risk Disclosure: Trading forex, indices, and CFDs involves substantial risk of loss and is not suitable for all investors.*"
5. For purchasing Smart Scalper EA, acquiring license keys, VIP mentorship, or joining Pool Account Management (@XTECHNG), direct the user directly to WhatsApp (+255 610 366 248) or email (Mickybonny9@gmail.com).`;

    // Build chat contents
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(conversationHistory)) {
      for (const turn of conversationHistory.slice(-6)) {
        if (turn.role && turn.text) {
          contents.push({
            role: turn.role === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Thank you for your question. For detailed setup assistance or to secure your Smart Scalper EA license, please reach out to our team via WhatsApp at +255 610 366 248.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini advisor error:', error);
    res.json({
      reply: "Welcome to EA ALGO COMMUNITY! Smart Scalper EA operates with strict stop-loss protection and dynamic micro-trend volatility filters on MetaTrader 5 (optimized for EURUSD, XAUUSD, NAS100). We do not employ dangerous martingale or grid techniques.\n\nTo acquire your SSEA license or schedule a remote AnyDesk MT5 setup, please connect directly with our engineering desk on WhatsApp: **+255 610 366 248** or email **Mickybonny9@gmail.com**.\n\n⚠️ *Risk Disclosure: Trading forex and CFDs carries significant risk of capital loss.*"
    });
  }
});

// 2. MT5 Public WebRequest License Verification
// POST /api/public/license/verify
app.post('/api/public/license/verify', (req: Request, res: Response) => {
  const { license_key, account_number } = req.body;

  if (!license_key) {
    res.status(400).json({ valid: false, error: 'Missing license_key parameter' });
    return;
  }

  const cleanKey = String(license_key).trim().toUpperCase();
  const license = db.licenses.find((l: License) => l.license_key.toUpperCase() === cleanKey);

  if (!license) {
    res.status(404).json({ valid: false, error: 'License key not found or unrecognized' });
    return;
  }

  if (license.status !== 'active') {
    res.status(403).json({ valid: false, error: 'License key is currently disabled by administrator' });
    return;
  }

  const now = new Date();
  const expiry = new Date(license.expires_at);
  if (now > expiry) {
    res.status(403).json({ valid: false, error: 'License key has expired. Contact support to renew.' });
    return;
  }

  // If license is locked to a specific MT5 account, verify account number
  if (license.mt5_account && account_number) {
    const reqAcc = String(account_number).trim();
    if (license.mt5_account !== reqAcc) {
      res.status(403).json({
        valid: false,
        error: `License is locked to account #${license.mt5_account}. Requested account #${reqAcc} is unauthorized.`
      });
      return;
    }
  } else if (!license.mt5_account && account_number) {
    // Auto-bind on first activation if account was unset
    license.mt5_account = String(account_number).trim();
  }

  // Update last check
  license.last_check_at = now.toISOString();
  saveData();

  const diffMs = expiry.getTime() - now.getTime();
  const days_left = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  res.json({
    valid: true,
    license_key: license.license_key,
    buyer_name: license.buyer_name,
    mt5_account: license.mt5_account,
    days_left,
    expires_at: license.expires_at,
    server_time: now.toISOString(),
  });
});

// 3. Products
app.get('/api/products', (_req: Request, res: Response) => {
  // Public only sees active products, keeping single-product storefront rule
  res.json(db.products.filter((p: Product) => p.active));
});

app.get('/api/admin/products', (_req: Request, res: Response) => {
  res.json(db.products);
});

app.post('/api/admin/products', (req: Request, res: Response) => {
  const { name, tagline, description, price, currency, active, featured, version, platform, min_deposit, recommended_pairs, timeframe } = req.body;
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    name: name || 'Smart Scalper EA',
    tagline: tagline || '',
    description: description || '',
    price: price === null || price === '' ? null : Number(price),
    currency: currency || 'USD',
    active: active ?? false, // New products start hidden
    featured: featured ?? false,
    version: version || 'v1.0.0',
    platform: platform || 'MetaTrader 5',
    min_deposit: Number(min_deposit) || 100,
    recommended_pairs: recommended_pairs || ['EURUSD', 'XAUUSD'],
    timeframe: timeframe || 'M5',
  };
  db.products.push(newProduct);
  saveData();
  res.status(201).json(newProduct);
});

app.put('/api/admin/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = db.products.find((p: Product) => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  const { name, tagline, description, price, currency, active, featured, version, min_deposit, recommended_pairs, timeframe } = req.body;
  if (name !== undefined) product.name = name;
  if (tagline !== undefined) product.tagline = tagline;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price === null || price === '' ? null : Number(price);
  if (currency !== undefined) product.currency = currency;
  if (active !== undefined) product.active = active;
  if (featured !== undefined) product.featured = featured;
  if (version !== undefined) product.version = version;
  if (min_deposit !== undefined) product.min_deposit = Number(min_deposit);
  if (recommended_pairs !== undefined) product.recommended_pairs = recommended_pairs;
  if (timeframe !== undefined) product.timeframe = timeframe;

  saveData();
  res.json(product);
});

// 4. Orders
app.get('/api/orders', (_req: Request, res: Response) => {
  res.json(db.orders);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { user_email, user_name, product_id, mt5_account, notes } = req.body;
  const product = db.products.find((p: Product) => p.id === product_id);
  if (!product || !product.active) {
    res.status(400).json({ error: 'Selected product is not currently available for orders' });
    return;
  }

  const newOrder: Order = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    user_email: user_email || 'anonymous@trader.com',
    user_name: user_name || 'Valued Trader',
    product_id: product.id,
    product_name: product.name,
    amount: product.price,
    currency: product.currency,
    status: 'pending',
    created_at: new Date().toISOString(),
    mt5_account: mt5_account ? String(mt5_account) : undefined,
    notes: notes || '',
  };

  db.orders.unshift(newOrder);
  saveData();
  res.status(201).json(newOrder);
});

// 5. Bot Performance Results (Auto-refreshable)
app.get('/api/bot-results', (_req: Request, res: Response) => {
  // Simulate live fluctuation in open P&L for realism
  const results = db.bot_results.map((r: BotResult) => {
    const jitter = (Math.random() - 0.48) * 1.5;
    return {
      ...r,
      open_pnl: Number((r.open_pnl + jitter).toFixed(2)),
    };
  });
  res.json(results);
});

// 6. Licenses (Admin & User verification)
app.get('/api/licenses', (_req: Request, res: Response) => {
  res.json(db.licenses);
});

app.post('/api/admin/licenses/generate', (req: Request, res: Response) => {
  const { buyer_email, buyer_name, duration_value, duration_type, mt5_account } = req.body;
  
  if (!buyer_email || !duration_value) {
    res.status(400).json({ error: 'Buyer email and duration are required' });
    return;
  }

  const numVal = Number(duration_value);
  const type = duration_type === 'months' ? 'months' : 'days';
  const now = new Date();
  const expiresAt = new Date();
  
  if (type === 'months') {
    expiresAt.setMonth(expiresAt.getMonth() + numVal);
  } else {
    expiresAt.setDate(expiresAt.getDate() + numVal);
  }

  const newLicense: License = {
    id: `lic-${Date.now()}`,
    buyer_email,
    buyer_name: buyer_name || buyer_email.split('@')[0],
    license_key: generateHexKey(),
    mt5_account: mt5_account ? String(mt5_account).trim() : null,
    status: 'active',
    duration_type: type,
    duration_value: numVal,
    created_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    last_check_at: null,
  };

  db.licenses.unshift(newLicense);
  saveData();
  res.status(201).json(newLicense);
});

app.post('/api/admin/licenses/:id/extend', (req: Request, res: Response) => {
  const { id } = req.params;
  const { days = 30 } = req.body;
  const lic = db.licenses.find((l: License) => l.id === id);
  if (!lic) {
    res.status(404).json({ error: 'License not found' });
    return;
  }
  const currentExpiry = new Date(lic.expires_at) > new Date() ? new Date(lic.expires_at) : new Date();
  currentExpiry.setDate(currentExpiry.getDate() + Number(days));
  lic.expires_at = currentExpiry.toISOString();
  saveData();
  res.json(lic);
});

app.post('/api/admin/licenses/:id/toggle', (req: Request, res: Response) => {
  const { id } = req.params;
  const lic = db.licenses.find((l: License) => l.id === id);
  if (!lic) {
    res.status(404).json({ error: 'License not found' });
    return;
  }
  lic.status = lic.status === 'active' ? 'disabled' : 'active';
  saveData();
  res.json(lic);
});

app.post('/api/admin/licenses/:id/unlink', (req: Request, res: Response) => {
  const { id } = req.params;
  const lic = db.licenses.find((l: License) => l.id === id);
  if (!lic) {
    res.status(404).json({ error: 'License not found' });
    return;
  }
  lic.mt5_account = null;
  saveData();
  res.json(lic);
});

// 7. EA Sources
app.get('/api/admin/ea-sources', (_req: Request, res: Response) => {
  res.json(db.ea_sources);
});

app.post('/api/admin/ea-sources', (req: Request, res: Response) => {
  const { name, code, is_new_version } = req.body;
  if (!code) {
    res.status(400).json({ error: 'Source code is required' });
    return;
  }

  if (is_new_version) {
    const nextVerNum = db.ea_sources.length + 1;
    const newVersion: EASource = {
      id: `src-${Date.now()}`,
      name: name || `Smart Scalper EA v${nextVerNum}.0`,
      code,
      version: `v${nextVerNum}.0`,
      updated_at: new Date().toISOString(),
    };
    db.ea_sources.unshift(newVersion);
    saveData();
    res.status(201).json(newVersion);
  } else {
    // Update active source
    if (db.ea_sources.length > 0) {
      db.ea_sources[0].code = code;
      if (name) db.ea_sources[0].name = name;
      db.ea_sources[0].updated_at = new Date().toISOString();
      saveData();
      res.json(db.ea_sources[0]);
    } else {
      const newSource: EASource = {
        id: `src-${Date.now()}`,
        name: name || 'Smart Scalper EA v1.0',
        code,
        version: 'v1.0',
        updated_at: new Date().toISOString(),
      };
      db.ea_sources.push(newSource);
      saveData();
      res.status(201).json(newSource);
    }
  }
});

// Start server
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BERSERKER EA Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

start();
