import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { Navbar } from '../components/Navbar';
import { TickerBand } from '../components/TickerBand';
import { HeroSection } from '../components/HeroSection';
import { ProductSection } from '../components/ProductSection';
import { BerserkerSection } from '../components/BerserkerSection';
import { SnxperBotSection } from '../components/SnxperBotSection';
import { HowItWorks } from '../components/HowItWorks';
import { RiskDisclaimerSection } from '../components/RiskDisclaimerSection';
import { Footer } from '../components/Footer';
import { FadeInOnScroll } from '../components/FadeInOnScroll';

import { DEFAULT_PRODUCTS } from '../data/defaultProduct';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data: Product[]) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchProducts();

    const handleUpdate = () => fetchProducts();
    window.addEventListener('xtech_products_updated', handleUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'xtech_products_updated') fetchProducts();
    });

    return () => {
      window.removeEventListener('xtech_products_updated', handleUpdate);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white bg-transparent">
      {/* Sticky Navigation */}
      <Navbar currentPath="/" navigate={navigate} />

      {/* Hero Marquee Ticker */}
      <TickerBand />

      {/* 🎨 HERO SECTION: XTECH ALGO LAB */}
      <FadeInOnScroll threshold={0.01}>
        <HeroSection
          onViewProduct={() => scrollTo('product')}
        />
      </FadeInOnScroll>

      {/* 🤖 SECTION 1: BERSERKER (The Scalper) */}
      <FadeInOnScroll>
        <BerserkerSection
          onViewProductPage={(pId) => navigate(pId ? `/product?id=${pId}` : '/product')}
        />
      </FadeInOnScroll>

      {/* 🚀 SECTION 2: SNXPERBOT (The Reversion Engine) */}
      <FadeInOnScroll>
        <SnxperBotSection
          onViewProductPage={(pId) => navigate(pId ? `/product?id=${pId}` : '/product')}
        />
      </FadeInOnScroll>

      {/* Dual Flagship Systems Storefront & Specs */}
      <FadeInOnScroll>
        <ProductSection
          products={products}
          onViewProductPage={(pId) => navigate(pId ? `/product?id=${pId}` : '/product')}
        />
      </FadeInOnScroll>

      {/* How it works */}
      <FadeInOnScroll>
        <HowItWorks />
      </FadeInOnScroll>

      {/* ⚠️ REGULATORY RISK DISCLAIMER (Bottom of page, in small, readable text) */}
      <FadeInOnScroll threshold={0.01}>
        <RiskDisclaimerSection />
      </FadeInOnScroll>

      {/* Footer */}
      <FadeInOnScroll threshold={0.05}>
        <Footer navigate={navigate} />
      </FadeInOnScroll>
    </div>
  );
};
