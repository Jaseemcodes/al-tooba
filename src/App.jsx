import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import TestimonialSection from './components/TestimonialSection';
import EducateYourself from './components/EducateYourself';
import InstagramReels from './components/InstagramReels';
import ScrollToTop from './components/ScrollToTop';
import TrustedBy from './components/TrustedBy';

// Lazy load the page components
const Home = lazy(() => import('./pages/Home'));
const Studio = lazy(() => import('./pages/Studio'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Journal = lazy(() => import('./pages/Journal'));
const JournalPost = lazy(() => import('./pages/JournalPost'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Wishlist = lazy(() => import('./pages/Wishlist'));

// Loading screen fallback for lazy loading
const LoadingFallback = () => (
  <div className="min-h-screen bg-parchment flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 border-3 border-forest border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-forest mt-4">Nurturing Wellness...</p>
    </div>
  </div>
);

// Global sections that should be hidden on specific pages
const GlobalSections = () => {
  const location = useLocation();
  
  // Hide these promotional sections on Contact Us, Studio, and Product Detail pages
  if (
    location.pathname === '/contact-us' || 
    location.pathname === '/studio' ||
    location.pathname.startsWith('/product/')
  ) {
    return null;
  }
  
  return (
    <>
      <TestimonialSection />
      <EducateYourself />
      <InstagramReels />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-parchment text-forest selection:bg-forest selection:text-parchment overflow-x-hidden font-sans">
        
        {/* Global sticky navigation bar */}
        <Navbar />

        {/* Global dynamic toasts notification system */}
        <Toast />

        {/* Main Routed Area */}
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:slug" element={<JournalPost />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/wishlist" element={<Wishlist />} />
              
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        {/* Promotional Global Sections (Hidden on Contact Us) */}
        <GlobalSections />

        {/* Global editorial brand footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
