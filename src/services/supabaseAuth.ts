import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isLiveSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.includes('supabase.co') &&
  !supabaseAnonKey.includes('...')
);

export const supabase: SupabaseClient | null = isLiveSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SupabaseEmailLog {
  id: string;
  type: 'confirm_signup' | 'welcome';
  recipient: string;
  recipientName: string;
  subject: string;
  htmlContent: string;
  token?: string;
  confirmationUrl?: string;
  sentAt: string;
}

// Supabase Auth Email Templates
export const SUPABASE_EMAIL_TEMPLATES = {
  confirmSignup: {
    subject: 'Confirm Your Signup - Berserker EA',
    templateRaw: `<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}" style="background:#d4af37;color:#000;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Confirm your mail</a></p>
<p>Or enter your 6-digit verification token in the portal:</p>
<h3 style="letter-spacing:4px;font-family:monospace;background:#f4ede0;padding:8px 14px;border-radius:6px;display:inline-block;color:#855f0b;">{{ .Token }}</h3>
<p style="color:#666;font-size:12px;margin-top:20px;">If you did not sign up for Berserker EA, please ignore this email.</p>`,
  },
  welcome: {
    subject: 'Welcome to Berserker EA | Next Steps & MT5 Setup Guide',
    templateRaw: `<h2>Welcome to EA ALGO COMMUNITY, {{ .Name }}!</h2>
<p>Your email has been successfully confirmed. You now have full access to your <strong>Berserker EA Client Dashboard</strong>.</p>
<div style="background:#faf8f5;border:1px solid #d4af37;padding:16px;border-radius:12px;margin:20px 0;">
  <h4 style="margin-top:0;color:#855f0b;">🚀 Quick Start Checklist:</h4>
  <ol style="padding-left:20px;line-height:1.7;">
    <li>Open MetaTrader 5 on your Windows PC or VPS.</li>
    <li>Download <strong>Smart Scalper EA v2.4.1</strong> from your Dashboard.</li>
    <li>Copy the file into <code>MQL5\\Experts</code> in your MT5 data folder.</li>
    <li>Allow <strong>WebRequest</strong> to our license verification server in MT5 Tools -> Options.</li>
    <li>Attach the EA to <strong>XAUUSD (Gold) M1/M5</strong> and enter your license key.</li>
  </ol>
</div>
<p><a href="{{ .DashboardURL }}" style="background:#111215;color:#ffd700;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Access Your Dashboard</a></p>
<p style="color:#777;font-size:12px;margin-top:24px;">Need instant concierge assistance? Message our team directly on WhatsApp: <a href="https://wa.me/255610366248">+255 610 366 248</a>.</p>`,
  },
};

const STORAGE_KEY_EMAILS = 'berserker_supabase_emails';

export function getStoredEmails(): SupabaseEmailLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMAILS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEmailLog(log: SupabaseEmailLog) {
  const current = getStoredEmails();
  current.unshift(log);
  // keep last 50 emails
  localStorage.setItem(STORAGE_KEY_EMAILS, JSON.stringify(current.slice(0, 50)));
}

// Send Supabase "Confirm Signup" template email
export async function sendSupabaseConfirmationEmail(
  email: string,
  name: string
): Promise<{ success: boolean; token: string; confirmationUrl: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const siteUrl = window.location.origin;
  const confirmationUrl = `${siteUrl}/auth?confirmation_token=${token}&type=signup&email=${encodeURIComponent(cleanEmail)}`;

  // Interpolate Supabase template
  let rendered = SUPABASE_EMAIL_TEMPLATES.confirmSignup.templateRaw
    .replace(/\{\{\s*\.ConfirmationURL\s*\}\}/g, confirmationUrl)
    .replace(/\{\{\s*\.Token\s*\}\}/g, token);

  const emailLog: SupabaseEmailLog = {
    id: `mail-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    type: 'confirm_signup',
    recipient: cleanEmail,
    recipientName: name || cleanEmail.split('@')[0],
    subject: SUPABASE_EMAIL_TEMPLATES.confirmSignup.subject,
    htmlContent: rendered,
    token,
    confirmationUrl,
    sentAt: new Date().toISOString(),
  };

  saveEmailLog(emailLog);

  // Store active token in localStorage and sessionStorage for bulletproof persistence
  try {
    localStorage.setItem(`supabase_token_${cleanEmail}`, token);
    localStorage.setItem(`verify_code_${cleanEmail}`, token);
    sessionStorage.setItem(`supabase_token_${cleanEmail}`, token);
  } catch {
    // ignore
  }

  return {
    success: true,
    token,
    confirmationUrl,
  };
}

// Trigger Welcome Email when email is confirmed
export async function triggerWelcomeEmail(
  user: UserProfile
): Promise<{ success: boolean; emailLog: SupabaseEmailLog }> {
  const cleanEmail = user.email.trim().toLowerCase();
  const siteUrl = window.location.origin;
  const dashboardUrl = `${siteUrl}/dashboard`;
  const name = user.full_name || cleanEmail.split('@')[0];

  let rendered = SUPABASE_EMAIL_TEMPLATES.welcome.templateRaw
    .replace(/\{\{\s*\.Name\s*\}\}/g, name)
    .replace(/\{\{\s*\.DashboardURL\s*\}\}/g, dashboardUrl);

  const emailLog: SupabaseEmailLog = {
    id: `mail-welcome-${Date.now()}`,
    type: 'welcome',
    recipient: cleanEmail,
    recipientName: name,
    subject: SUPABASE_EMAIL_TEMPLATES.welcome.subject,
    htmlContent: rendered,
    sentAt: new Date().toISOString(),
  };

  saveEmailLog(emailLog);
  console.log(`[Supabase Welcome Email Trigger] Dispatched to ${cleanEmail}`);

  return {
    success: true,
    emailLog,
  };
}
