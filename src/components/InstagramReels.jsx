import { useState } from 'react';
import { motion } from 'motion/react';

const shorts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1611078732627-7cdb22fb408b?q=80&w=600&auto=format&fit=crop', title: 'Herbal Routine', channel: 'Ruhani Souq', time: '0:15 / 0:45', embed: 'https://www.instagram.com/reel/C_uOf2ViJWm/embed' },
  { id: 2, image: 'https://images.unsplash.com/photo-1608248593842-8d7d896173d1?q=80&w=600&auto=format&fit=crop', title: 'Main Ruhani Talbina Hu', channel: 'Ruhani Souq', time: '0:30 / 1:00', embed: 'https://www.instagram.com/reel/DZz1F4vz_K3/embed' },
  { id: 3, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop', title: 'Power Of Kalonji', channel: 'Ruhani Souq', time: '0:02 / 1:00', embed: 'https://www.instagram.com/reel/DZr_grEzSQS/embed' },
  { id: 4, image: 'https://images.unsplash.com/photo-1615397323215-bdf97f0fb525?q=80&w=600&auto=format&fit=crop', title: 'Ruhani Talbina In Madina', channel: 'Ruhani Souq', time: '0:10 / 0:50', embed: 'https://www.instagram.com/reel/DZh1QCnTcte/embed' },
  { id: 5, image: 'https://images.unsplash.com/photo-1611078449911-37d45c55be0f?q=80&w=600&auto=format&fit=crop', title: 'Morning Routine', channel: 'Ruhani Souq', time: '0:05 / 0:30', embed: 'https://www.instagram.com/reel/DUIfcrzjC2u/embed' },
];

export default function InstagramReels() {
  const [currentIndex, setCurrentIndex] = useState(2);

  return (
    <section className="bg-[#e9f2e9] py-20 border-t border-[#FAF7F2] relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">
      
      {/* Header Area */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 mb-12 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-[#D4A24C] font-sans font-bold tracking-widest uppercase text-xs mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>@RUHANISOUQ</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-bold text-[#0D3B2A] mb-4"
        >
          Benefits Of Our Products
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto font-sans text-sm md:text-base"
        >
          Join our community and explore the benefits of purely natural lifestyle choices, straight from our Instagram.
        </motion.p>
      </div>

      {/* Navigation Buttons and Carousel Container */}
      <div className="relative w-full max-w-[1400px] flex items-center justify-center mb-8">
        
        {/* Left Button */}
        <button 
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="absolute left-4 md:left-12 z-50 p-4 rounded-full bg-white text-[#0D3B2A] hover:bg-[#D4A24C] hover:text-white transition-colors border border-[#0D3B2A]/10 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* 3D Carousel */}
        <div className="relative w-full h-[650px] flex items-center justify-center perspective-[1000px]">
          {shorts.map((short, index) => {
            const diff = index - currentIndex;
            const absDiff = Math.abs(diff);
            const isCenter = absDiff === 0;
            const isAdjacent = absDiff === 1;
            const isOuter = absDiff > 1;

            let x = 0;
            if (diff === -2) x = -500;
            if (diff === -1) x = -300;
            if (diff === 0) x = 0;
            if (diff === 1) x = 300;
            if (diff === 2) x = 500;

            if (absDiff > 2) return null;

            return (
              <motion.div
                key={short.id}
                onClick={() => !isCenter && setCurrentIndex(index)}
                animate={{
                  x,
                  scale: isCenter ? 1 : isAdjacent ? 0.8 : 0.65,
                  opacity: isCenter ? 1 : isAdjacent ? 0.9 : 0.6,
                  zIndex: 10 - absDiff,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute w-[340px] h-[600px] rounded-[24px] overflow-hidden shadow-2xl bg-white"
              >
                {/* Adding a dynamic key ensures the iframe unmounts and remounts when it leaves the center, stopping the video */}
                <iframe 
                  key={`${short.id}-${isCenter}`}
                  src={short.embed} 
                  width="340" 
                  height="600" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowtransparency="true"
                  allow="encrypted-media"
                  className="w-full h-full scale-[1.01]"
                ></iframe>

                {/* Invisible overlay for non-center cards to capture click for rotation and block iframe interaction */}
                {!isCenter && (
                  <div className="absolute inset-0 z-10 cursor-pointer bg-black/5 hover:bg-black/0 transition-colors" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Button */}
        <button 
          onClick={() => setCurrentIndex(prev => Math.min(shorts.length - 1, prev + 1))}
          disabled={currentIndex === shorts.length - 1}
          className="absolute right-4 md:right-12 z-50 p-4 rounded-full bg-white text-[#0D3B2A] hover:bg-[#D4A24C] hover:text-white transition-colors border border-[#0D3B2A]/10 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}
