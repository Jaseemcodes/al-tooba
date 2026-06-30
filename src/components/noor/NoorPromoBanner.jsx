import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function NoorPromoBanner() {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-[#0D3B2A] flex items-center justify-center">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0D3B2A]/60 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3B2A] via-transparent to-[#0D3B2A] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1558238722-159d3e8eeb63?q=80&w=2400&auto=format&fit=crop" 
          alt="Glowing lanterns and Ramadan atmosphere" 
          className="w-full h-full object-cover object-center opacity-40"
        />
        {/* Subtle crescent moon glow overlay (CSS approximation) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A24C] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#D4A24C]/40 mb-8"
        >
          {/* Minimalist moon SVG */}
          <svg className="w-8 h-8 text-[#D4A24C]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif text-[#FAF7F2] font-bold leading-tight"
        >
          The Ramadan<br />Wellness Collection
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg text-[#FAF7F2]/80 font-sans max-w-2xl mx-auto"
        >
          Prepare your body and spirit for the holy month. Discover our exclusive curated bundles designed for lasting energy and spiritual clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <MagneticButton className="bg-[#FAF7F2] text-[#0D3B2A] px-10 py-4 rounded-full font-sans font-bold uppercase tracking-widest text-sm shadow-2xl hover:bg-[#D4A24C] hover:text-white transition-colors">
            Shop the Collection
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
