import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LiveWallpaper } from './components/LiveWallpaper';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  // Sync document head and titles per route
  useEffect(() => {
    let title = 'BERSERKER EA — Smart Scalper MT5 | EA ALGO COMMUNITY';
    let description = 'Official portal for BERSERKER EA (Smart Scalper EA) for MetaTrader 5 and independent Pool Account Management by EA ALGO COMMUNITY.';

    if (currentPath === '/product') {
      title = 'Smart Scalper EA — MT5 Robot | EA ALGO COMMUNITY';
      description = 'Official product details, system specifications, and MT5 license ordering for Smart Scalper EA.';
    } else if (currentPath === '/auth') {
      title = 'Sign In / Register — BERSERKER EA Client Portal';
      description = 'Access your BERSERKER EA client dashboard, manage MT5 licenses, and verify your trader account.';
    } else if (currentPath === '/dashboard') {
      title = 'Client Dashboard — BERSERKER EA';
      description = 'Manage your Smart Scalper EA licenses, active MT5 account bindings, and order history.';
    } else if (currentPath === '/admin') {
      title = 'Admin Operations — BERSERKER EA';
      description = 'EA ALGO COMMUNITY administrative console: product pricing, order flow, live bot results, and MQL5 license generation.';
    }

    document.title = title;

    // Update meta tags
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }, [currentPath]);

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/product':
        return <ProductPage navigate={navigate} />;
      case '/auth':
        return <AuthPage navigate={navigate} />;
      case '/dashboard':
        return <DashboardPage navigate={navigate} />;
      case '/admin':
        return <AdminPage navigate={navigate} />;
      case '/':
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="relative min-h-screen">
        {/* Persistent live animated wallpaper across the whole website */}
        <LiveWallpaper />
        
        {/* Page content layer */}
        <div className="relative z-10">
          {renderCurrentPage()}
        </div>
      </div>
    </AuthProvider>
  );
}
