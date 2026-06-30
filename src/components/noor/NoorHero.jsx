import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function NoorHero() {
  const containerRef = useRef(null);
  
  // Setup Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Layer translations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const fogY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  // Floating particles generator
  const renderParticles = (count, sizeCls, colorCls, durationRange) => {
    return Array.from({ length: count }).map((_, i) => {
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const duration = Math.random() * durationRange[1] + durationRange[0];
      const delay = Math.random() * 5;
      
      return (
        <motion.div
          key={i}
          className={`absolute rounded-full ${sizeCls} ${colorCls} blur-[1px]`}
          style={{ left, top }}
          animate={{
            y: ['-20px', '20px', '-20px'],
            x: ['-10px', '10px', '-10px'],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      );
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#0D3B2A] flex items-center justify-center"
    >
      {/* Background Layer: Mountains & River */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay for text readability */}
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop" 
          alt="Breathtaking mountain valley with warm sunlight" 
          className="w-full h-[120%] object-cover object-center"
        />
        {/* Subtle geometric islamic pattern overlay */}
        <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#D4A24C 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </motion.div>

      {/* Particle Effects (Golden Dust) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {renderParticles(30, 'w-1 h-1 md:w-1.5 md:h-1.5', 'bg-[#D4A24C]', [3, 7])}
      </div>

      {/* Atmospheric Fog */}
      <motion.div 
        className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#0D3B2A] to-transparent z-10 pointer-events-none"
        style={{ y: fogY }}
      />

      {/* Foreground Text Content */}
      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full flex flex-col items-start lg:items-center text-left lg:text-center"
        style={{ y: textY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#D4A24C]/30 bg-[#0D3B2A]/40 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4A24C] animate-pulse"></span>
          <span className="text-[#D4A24C] text-xs font-sans font-bold tracking-[0.2em] uppercase">Premium Wellness</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FAF7F2] leading-[1.1] tracking-tight max-w-5xl"
        >
          Reviving Sunnah,<br />Restoring Purity
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 text-lg md:text-xl text-[#FAF7F2]/80 font-sans max-w-2xl leading-relaxed"
        >
          Experience the finest organic remedies sourced responsibly. Award-winning formulations inspired by prophetic wisdom, crafted for modern vitality.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton 
            style={{ '--liquid-bg': '#F5EBD8', '--liquid-text': '#0D3B2A' }}
            className="liquid bg-[#D4A24C] text-[#0D3B2A] px-10 py-4 rounded-full font-sans font-bold uppercase tracking-wider text-sm shadow-[0_0_40px_rgba(212,162,76,0.3)] hover:shadow-[0_0_60px_rgba(212,162,76,0.5)] transition-shadow border-none"
          >
            Explore Collection
          </MagneticButton>
          
          <button className="group flex items-center gap-4 text-[#FAF7F2] hover:text-[#D4A24C] transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-[#FAF7F2]/30 flex items-center justify-center group-hover:border-[#D4A24C] transition-colors">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="font-sans font-bold text-sm tracking-widest uppercase">Watch Film</span>
          </button>
        </motion.div>
      </motion.div>
      
      {/* Luxury Product Showcase floating on the right side on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
        className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 z-20 w-[400px]"
      >
        <motion.img 
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          src="https://images.unsplash.com/photo-1608248593842-8d7d896173d1?q=80&w=800&auto=format&fit=crop" 
          alt="Premium Honey and Oils" 
          className="w-full rounded-[2rem] shadow-2xl border-4 border-[#D4A24C]/20"
        />
        {/* Glass card attached */}
        <div className="absolute -bottom-10 -left-10 bg-[#FAF7F2]/10 backdrop-blur-xl border border-[#FAF7F2]/20 p-6 rounded-2xl shadow-xl">
          <p className="text-[#D4A24C] text-xs font-bold uppercase tracking-widest mb-1">Featured</p>
          <p className="text-[#FAF7F2] font-serif text-xl">Pure Sidr Honey</p>
        </div>
      </motion.div>
      
    </section>
  );
}
