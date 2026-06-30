import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Lenis Smooth Scroll & GSAP ScrollTrigger Integration
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
});

// Update ScrollTrigger on scroll
lenis.on('scroll', ScrollTrigger.update);

// Direct ticker update
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Remove ticker lag smoothing to prevent animation jumps
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
