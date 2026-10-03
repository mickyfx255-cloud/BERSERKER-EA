export interface Product {
  id: string;
  name: string;
  brand?: string;
  tagline: string;
  description: string;
  price: number | null; // null = "Price coming soon"
  currency: string;
  active: boolean;
  featured: boolean;
  version: string;
  platform: string;
  min_deposit: number;
  recommended_pairs: string[];
  timeframe: string;
  image_url?: string;
  pillars?: string[];
  badge?: string;
}

export interface Order {
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

export interface BotResult {
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

export interface License {
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

export interface EASource {
  id: string;
  name: string;
  code: string;
  version: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  email_verified: boolean;
  created_at: string;
}
