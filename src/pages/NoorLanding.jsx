import { useEffect } from 'react';
import NoorHero from '../components/noor/NoorHero';
import NoorCategories from '../components/noor/NoorCategories';
import NoorBestSellers from '../components/noor/NoorBestSellers';
import NoorPromoBanner from '../components/noor/NoorPromoBanner';

export default function NoorLanding() {
  // Ensure we start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#0D3B2A] font-sans selection:bg-[#D4A24C] selection:text-white">
      {/* 1. Cinematic Hero */}
      <NoorHero />

      {/* 2. Trust Indicators Bar */}
      <div className="w-full bg-[#0D3B2A] border-t border-white/10 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-6 md:gap-0 text-[#FAF7F2]/80 text-xs font-bold uppercase tracking-widest font-sans">
          <div className="flex items-center gap-3">
            <span className="text-[#D4A24C] text-lg">✓</span> 100% Organic & Raw
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#D4A24C] text-lg">✓</span> Ethically Sourced
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#D4A24C] text-lg">✓</span> Prophetic Tibb Guidelines
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#D4A24C] text-lg">✓</span> Worldwide Shipping
          </div>
        </div>
      </div>

      {/* 3. Category Showcase */}
      <NoorCategories />

      {/* 4. Best Sellers Showcase */}
      <NoorBestSellers />

      {/* 5. Ramadan Promo Banner */}
      <NoorPromoBanner />

    </div>
  );
}
