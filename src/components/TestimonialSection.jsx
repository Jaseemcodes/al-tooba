import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const quotes = [
  {
    lang: 'en',
    dir: 'ltr',
    text: "True healing is found in the remedies blessed by prophetic wisdom. Our mission is to revive the sacred Sunnah of Tibb-e-Nabawi, bringing you pure, natural cures that nourish both the body and the soul.",
    fontClass: "font-serif text-[#0D3B2A] text-xl md:text-2xl lg:text-3xl"
  },
  {
    lang: 'hi',
    dir: 'ltr',
    text: "सच्ची शिफा उन नुस्खों में है जिन्हें नबवी हिकमत से नवाज़ा गया है। हमारा मकसद तिब्ब-ए-नबवी की मुक़द्दस सुन्नत को ज़िंदा करना है, ताकि आप तक वो खालिस और कुदरती इलाज पहुँच सके जो जिस्म और रूह दोनों को ताक़त बख़्शे।",
    fontClass: "font-sans text-[#0D3B2A] text-xl md:text-2xl lg:text-3xl"
  },
  {
    lang: 'ur',
    dir: 'rtl',
    text: "حقیقی شفا ان نسخوں میں ہے جنہیں نبوی حکمت سے نوازا گیا ہے۔ ہمارا مقصد طب نبوی کی مقدس سنت کو زندہ کرنا ہے، تاکہ آپ تک وہ خالص اور قدرتی علاج پہنچ سکے جو جسم اور روح دونوں کو طاقت بخشے۔",
    fontClass: "font-sans text-[#0D3B2A] text-2xl md:text-3xl lg:text-4xl text-right font-medium leading-[1.6]"
  }
];

const AnimatedQuote = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const currentQuote = quotes[index];
  const initialX = currentQuote.dir === 'rtl' ? 50 : -50;

  return (
    <div 
      className="relative border-l-4 border-[#D4A24C] pl-6 py-2 overflow-hidden w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Invisible placeholder to establish the correct height dynamically at all screen sizes */}
      <div className="grid opacity-0 pointer-events-none select-none invisible w-full">
        {quotes.map((q, i) => (
          <div key={i} className={`${q.fontClass} col-start-1 row-start-1 w-full flex items-center`} dir={q.dir}>
            <span>"{q.text}"</span>
          </div>
        ))}
      </div>

      {/* Actual animated text overlay */}
      <AnimatePresence>
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, x: initialX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -initialX }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 pl-6 py-2 w-full flex items-center ${currentQuote.fontClass}`}
          dir={currentQuote.dir}
        >
          <span>"{currentQuote.text}"</span>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
};

export default function TestimonialSection() {
  return (
    <section className="w-full bg-[#e9f2e9] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Left Column (Content) */}
        <div className="flex flex-col items-start space-y-10">
          
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight tracking-tight">
            HAKEEM ABDUL QADIR ATTARI
          </h2>

          {/* Company Tag */}
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-xs font-sans font-bold tracking-wider uppercase shadow-md">
            Founder
          </div>

          {/* Quote Block */}
          <AnimatedQuote />

          
        </div>

        {/* Right Column (Visual) */}
        <div className="flex justify-center items-center w-full h-full min-h-[400px] relative">
          {/* Photo of Hakeem Abdul Qadir Attari */}
          <div className="relative w-full max-w-md aspect-[4/5] rounded-[30px] border-4 border-[#D4A24C] flex items-center justify-center bg-[#e9f2e9] shadow-2xl overflow-hidden group">
            <img 
              src="/hakeem_attari.jpg" 
              alt="Hakeem Abdul Qadir Attari" 
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
