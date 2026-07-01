import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import HeroParticles from '../components/HeroParticles';
import About3DCarousel from '../components/About3DCarousel';
import NoorCategories from '../components/noor/NoorCategories';
import NoorBestSellers from '../components/noor/NoorBestSellers';
import NoorCompleteCollection from '../components/noor/NoorCompleteCollection';
import NoorQuoteDivider from '../components/noor/NoorQuoteDivider';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const marqueeRef = useRef(null);

  // Custom text splitter for character stagger animation
  const splitText = (text, isItalic = false) => {
    const textColor = isItalic ? 'text-[#D4A24C]' : 'text-white';
    const fontClass = isItalic ? 'font-serif italic font-normal' : 'font-serif font-bold';
    
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`inline-block hero-char ${textColor} ${fontClass}`}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Stagger reveal characters on load
      const tl = gsap.timeline();
      tl.fromTo('.hero-char', 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.9,
          ease: 'power3.out'
        }
      );

      // 2. Subtext and CTA fade-in delay
      if (subtextRef.current && ctaRef.current) {
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        ).fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 4. Marquee Horizontal Scroll ticker
      const marquee = marqueeRef.current;
      if (marquee) {
        gsap.to(marquee, {
          x: '-50%',
          duration: 25,
          ease: 'linear',
          repeat: -1
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleCTAClick = (e) => {
    e.preventDefault();
    document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* 1. Fullscreen Hero Section */}
      <section className="relative w-full min-h-[78.5vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 md:pt-0 md:pb-0 overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          poster="/hero_bg.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3B2A]/15 via-transparent to-[#0D3B2A]/15 z-0" />

        {/* Floating Bokeh Particles */}
        <HeroParticles />

        {/* Hero Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-0 sm:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left -mt-[15%] md:mt-0 relative z-30 px-6 sm:px-0">
            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight font-serif select-none text-white drop-shadow-[0_16px_24px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-wrap justify-start gap-x-4">
                <span>{splitText('Reviving', false)}</span>
                <span>{splitText('Sunnah,', true)}</span>
              </div>
              <div className="flex flex-wrap justify-start gap-x-4 mt-2">
                <span>{splitText('restoring', false)}</span>
                <span>{splitText('purity.', true)}</span>
              </div>
            </h1>

            {/* Subtext and Button Container */}
            <div className="max-w-xl w-full mt-8">
              <p
                ref={subtextRef}
                className="text-sm sm:text-base text-white/90 leading-relaxed font-sans opacity-0 drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]"
              >
                Embrace the healing wisdom of Tibb-e-Nabawi. We curate organic, Sunnah-inspired botanical remedies crafted from pure, halal ingredients to nourish your soul, mind, and body.
              </p>

              {/* CTA Button */}
              <div ref={ctaRef} className="mt-8 flex justify-start opacity-0">
                <button
                  onClick={handleCTAClick}
                  className="rounded-full px-10 py-4 text-xs font-sans font-bold uppercase tracking-widest bg-parchment text-forest border border-forest/20 hover:bg-forest hover:text-parchment hover:border-transparent transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer shadow-lg cursor-pointer"
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>

          {/* Right: 3D Premium Carousel */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end -mt-[50%] md:mt-0 relative z-20">
            <div className="w-full max-w-md origin-center md:origin-right flex justify-center">
               <About3DCarousel />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Text Marquee Strip */}
      <div className="w-full bg-[#203d1e] border-y border-parchment/10 py-4 overflow-hidden relative z-10 select-none">
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-16 text-parchment/80 font-serif italic text-lg sm:text-xl">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-6">
              <span>Nurturing Wellness, Restoring Purity</span>
              <span className="text-gold font-sans font-bold text-xs uppercase tracking-widest">• AL TOOBA</span>
              <span>Prophetic Tibb-e-Nabawi Remedies</span>
              <span className="text-gold font-sans font-bold text-xs uppercase tracking-widest">• 100% ORGANIC</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. Shop By Categories (Noor Remedies) */}
      <NoorCategories />

      {/* 4. Our Best Sellers (Noor Remedies) */}
      <div id="explore-section">
        <NoorBestSellers />
      </div>

      {/* Complete Collection (Mehrab Cards) */}
      <NoorCompleteCollection />

      {/* 5. Brand Value / Hadith Divider */}
      <NoorQuoteDivider />
    </div>
  );
}
