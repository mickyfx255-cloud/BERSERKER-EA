import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { Navbar } from '../components/Navbar';
import { TickerBand } from '../components/TickerBand';
import { HeroSection } from '../components/HeroSection';
import { ProductSection } from '../components/ProductSection';
import { HowItWorks } from '../components/HowItWorks';
import { PlatformSection } from '../components/PlatformSection';
import { AIAdvisor } from '../components/AIAdvisor';
import { PoolTeaserSection } from '../components/PoolTeaserSection';
import { MentorshipSection } from '../components/MentorshipSection';
import { Footer } from '../components/Footer';
import { FadeInOnScroll } from '../components/FadeInOnScroll';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch products from server (active only)
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        if (data && data.length > 0) {
          // Storefront shows only the single product (Smart Scalper EA)
          setProduct(data[0]);
        }
      })
      .catch(err => console.error('Error fetching product:', err));
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

      {/* The Single Product Storefront Section */}
      <FadeInOnScroll>
        <ProductSection
          product={product}
          onViewProductPage={() => navigate('/product')}
        />
      </FadeInOnScroll>

      {/* Pool Account Management Campaign Feature Banner */}
      <FadeInOnScroll>
        <PoolTeaserSection onNavigateToPool={() => navigate('/pool-management')} />
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
