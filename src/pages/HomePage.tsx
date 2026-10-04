import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { Navbar } from '../components/Navbar';
import { TickerBand } from '../components/TickerBand';
import { HeroSection } from '../components/HeroSection';
import { ProductSection } from '../components/ProductSection';
import { HowItWorks } from '../components/HowItWorks';
import { PlatformSection } from '../components/PlatformSection';
import { AIAdvisor } from '../components/AIAdvisor';
import { MentorshipSection } from '../components/MentorshipSection';
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
    <div className="min-h-screen text-[#1a1a1a]">
      {/* Sticky Navigation */}
      <Navbar currentPath="/" navigate={navigate} />

      {/* Hero Marquee Ticker */}
      <TickerBand />

      {/* Full-Screen Animated Hero */}
      <FadeInOnScroll threshold={0.01}>
        <HeroSection
          onViewProduct={() => scrollTo('product')}
          onAskAI={() => scrollTo('advisor')}
        />
      </FadeInOnScroll>

      {/* Dual Flagship Products Storefront Section */}
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

      {/* Platform MetaTrader 5 */}
      <FadeInOnScroll>
        <PlatformSection />
      </FadeInOnScroll>

      {/* AI Advisor Chat */}
      <FadeInOnScroll>
        <AIAdvisor />
      </FadeInOnScroll>

      {/* Mentorship & Embedded Video */}
      <FadeInOnScroll>
        <MentorshipSection />
      </FadeInOnScroll>

      {/* Footer */}
      <FadeInOnScroll threshold={0.05}>
        <Footer navigate={navigate} />
      </FadeInOnScroll>
    </div>
  );
};
