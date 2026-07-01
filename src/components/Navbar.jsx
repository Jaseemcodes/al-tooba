import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import CartDrawer from './CartDrawer';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Mega Menu Dropdown States & Handlers
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
  };

  const location = useLocation();
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);
  const lastScrollY = useRef(0);

  // Clean up timer on unmount & close on location change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location.pathname]);

  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'All'
    ? products.slice(0, 8)
    : products.filter(p => p.category === activeCategory).slice(0, 8);

  const isHome = location.pathname === '/';
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useWishlistStore((state) => state.items.length);

  // Monitor scroll for header background toggle and smart hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check immediately on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // GSAP animation for mobile menu overlay opening/closing
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Fade in overlay
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.out'
      });
      // Stagger link reveal
      gsap.fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power3.in'
      });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on page transitions
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Determine navbar styles
  const isTransparent = isHome && !isScrolled && !isMegaMenuOpen;
  const navbarClasses = isTransparent
    ? 'bg-transparent text-forest border-transparent'
    : 'bg-parchment text-forest border-b border-[#d6cdb8] shadow-[0_4px_20px_rgba(31,58,29,0.03)]';

  const logoSrc = '/src/assets/logo.png';

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: '/studio' },
    { name: 'ABOUT', path: '/about' },
    { name: 'JOURNAL', path: '/journal' },
    { name: 'CONTACT US', path: '/contact-us' }
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out ${navbarClasses} ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          {/* Logo Area */}
          <Link to="/" className="flex items-center w-[160px] sm:w-[220px] transition-opacity hover:opacity-90">
            <img src={logoSrc} alt="Al-Tooba Logo" className={`h-10 sm:h-12 w-auto`} />
          </Link>

          {/* Nav Links Center */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              if (item.name === 'PRODUCTS') {
                return (
                  <div
                    key={item.name}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="py-3"
                  >
                    <Link
                      to={item.path}
                      className={`text-[13px] font-sans font-bold tracking-widest transition-colors relative py-1.5 flex items-center gap-1.5 ${
                        isTransparent
                          ? 'text-forest/80 hover:text-forest'
                          : 'text-forest/80 hover:text-forest'
                      }`}
                    >
                      {item.name}
                      <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180 text-[#D4A24C]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A24C] rounded-full" />
                      )}
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-[13px] font-sans font-bold tracking-widest transition-colors relative py-1.5 ${
                    isTransparent
                      ? 'text-forest/80 hover:text-forest'
                      : 'text-forest/80 hover:text-forest'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Area Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Login */}
            <Link
              to="/login"
              className={`p-2 rounded-full hover:bg-forest/5 transition-colors relative ${
                isTransparent ? 'text-forest hover:text-forest/80' : 'text-forest'
              }`}
              aria-label="Login"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`p-2 rounded-full hover:bg-forest/5 transition-colors relative cursor-pointer ${
                isTransparent ? 'text-forest hover:text-forest/80' : 'text-forest'
              }`}
              aria-label="Shopping Cart"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-forest text-parchment text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-forest/5 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {isMegaMenuOpen && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onWheel={(e) => e.stopPropagation()}
            className="mega-menu-enter fixed left-0 w-screen bg-[#FAF7F2] border-t-2 border-[#D4A24C]/40 shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-50 overflow-hidden"
            style={{ top: navRef.current ? navRef.current.offsetHeight + 'px' : '72px', height: `calc(100vh - ${navRef.current ? navRef.current.offsetHeight : 72}px)` }}
          >
            <div className="w-full h-full grid grid-cols-12">
              
              {/* Left Column: Categories List */}
              <div className="col-span-3 bg-[#0D3B2A] py-6 px-4 border-r border-[#D4A24C]/20 flex flex-col gap-1 overflow-y-auto"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4A24C #0a271d', overscrollBehavior: 'contain' }}
              >
                <Link
                  to="/studio"
                  onMouseEnter={() => setActiveCategory('All')}
                  onClick={() => setIsMegaMenuOpen(false)}
                  className={`mega-cat-item w-full py-3 px-4 rounded-lg text-left text-xs font-sans font-bold tracking-widest transition-all duration-200 flex justify-between items-center ${
                    activeCategory === 'All' 
                      ? 'bg-[#D4A24C] text-[#0D3B2A]' 
                      : 'text-[#FAF7F2]/80 hover:bg-[#D4A24C]/15 hover:text-[#FAF7F2]'
                  }`}
                  style={{ animationDelay: '0.05s' }}
                >
                  <span>ALL PRODUCTS</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>

                {uniqueCategories.filter(cat => cat !== 'All').map((cat, i) => (
                  <Link
                    key={cat}
                    to={`/studio?category=${encodeURIComponent(cat)}`}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => setIsMegaMenuOpen(false)}
                    className={`mega-cat-item w-full py-3 px-4 rounded-lg text-left text-[11px] font-sans font-bold tracking-widest transition-all duration-200 ${
                      activeCategory === cat 
                        ? 'bg-[#D4A24C] text-[#0D3B2A]' 
                        : 'text-[#FAF7F2]/80 hover:bg-[#D4A24C]/15 hover:text-[#FAF7F2]'
                    }`}
                    style={{ animationDelay: `${(i + 1) * 0.05 + 0.05}s` }}
                  >
                    {cat.toUpperCase()}
                  </Link>
                ))}
              </div>

              {/* Right Column: Products Grid */}
              <div 
                className="col-span-9 p-6 overflow-y-auto h-full"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4A24C #e8e2d8', overscrollBehavior: 'contain' }}
              >
                {filteredProducts.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-[#0D3B2A]/40 font-sans text-sm">
                    No products found in this category.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    {filteredProducts.map((prod, i) => (
                      <Link
                        key={prod.id}
                        to={`/product/${prod.slug}`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="mega-card-item group bg-white border border-[#0D3B2A]/8 hover:border-[#D4A24C]/50 hover:shadow-lg rounded-xl p-3 flex flex-col justify-between transition-all duration-300"
                        style={{ animationDelay: `${i * 0.06 + 0.15}s` }}
                      >
                        {/* Product Image Container */}
                        <div className="w-full aspect-square rounded-lg bg-[#F5F0E8] overflow-hidden flex items-center justify-center p-2 mb-2">
                          <img 
                            src={prod.images[0]} 
                            alt={prod.name} 
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>

                        {/* Title & Price */}
                        <div className="flex-grow flex flex-col justify-between w-full">
                          <h4 className="text-[11px] text-[#0D3B2A] font-serif font-bold text-center group-hover:text-[#D4A24C] transition-colors leading-tight line-clamp-2 mt-1">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-[#D4A24C] font-sans font-bold mt-1.5 text-center">
                            {formatPrice(prod.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-35 bg-black/10 backdrop-blur-md text-parchment flex flex-col items-center justify-center gap-8 pointer-events-none opacity-0 transform -translate-y-6 overflow-hidden"
      >
        {menuItems.map((item, idx) => (
          <Link
            key={item.name}
            ref={(el) => (linksRef.current[idx] = el)}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl sm:text-3xl font-serif font-bold italic tracking-wide text-white hover:scale-105 transition-all duration-300 shadow-sm drop-shadow-md"
          >
            {item.name}
          </Link>
        ))}
        <Link
          ref={(el) => (linksRef.current[menuItems.length] = el)}
          to="/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="liquid mt-8 rounded-full px-10 py-3 bg-forest text-parchment text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 border-none"
          style={{ '--liquid-bg': '#F5EBD8', '--liquid-text': '#0D3B2A' }}
        >
          LOGIN
        </Link>
      </div>

      {/* Cart Slider Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
