import React, { useEffect, useRef } from 'react';
import wallpaperImg from '../assets/images/xtech_globe_trading_bg_1791109912975.jpg';

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulseOffset: number;
}

export const LiveWallpaper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Passive mouse tracking (only updates target coordinates, 0 re-renders)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mousePosRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mousePosRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    // Detect scroll to throttle rendering during active scrolls for 120FPS fluidity
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 120);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Zero-allocation high performance 60FPS particle loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const particleColors = [
      'rgba(212, 175, 55, ',   // Metallic Gold
      'rgba(0, 112, 243, ',    // XTech Electric Blue
      'rgba(255, 215, 0, ',    // Bright Bullion Gold
      'rgba(14, 165, 233, ',   // Cyan Data Particle
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = 35; // optimal balance of beauty & zero CPU impact
      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 2.2 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius,
          radius: baseRadius,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.45 - 0.1,
          alpha: Math.random() * 0.45 + 0.15,
          color: particleColors[i % particleColors.length],
          pulseSpeed: 0.02 + Math.random() * 0.02,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    let lastTime = performance.now();
    let tick = 0;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      // If user is actively scrolling, skip canvas redraw so scroll compositor has 100% frame rate
      if (isScrollingRef.current) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      tick += dt;

      // Mouse parallax smooth dampening
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.035;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // Fast-path rendering without heavy gradient allocations
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -20) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        const wave = Math.sin(tick * p.pulseSpeed * 60 + p.pulseOffset);
        const currentAlpha = Math.max(0.08, p.alpha + wave * 0.2);

        const renderX = p.x + mousePosRef.current.x * (p.baseRadius * 3);
        const renderY = p.y + mousePosRef.current.y * (p.baseRadius * 3);

        // Halo
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.baseRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha * 0.35})`;
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        contain: 'strict',
      }}
    >
      {/* Layer 1: Luxury Trading Office Wallpaper Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      >
        <img
          src={wallpaperImg}
          alt="XTech Global Trading Background"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'saturate(1.08) contrast(1.03)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      {/* Layer 2: Lightweight Static Coordinate Grid */}
      <div className="absolute inset-0 gold-grid opacity-15" />

      {/* Layer 3: GPU-friendly Sunlight Sweep (pure gradient, no gaussian filter blur) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <div className="animate-[sunlightSweep_18s_linear_infinite] h-full w-[35vw] -skew-x-25 bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent" />
      </div>

      {/* Layer 4: HTML5 Canvas Particles (auto-throttles during active scroll) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Layer 5: Clean Subtle Vignette for Content Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/15 via-transparent to-white/10" />
    </div>
  );
};
