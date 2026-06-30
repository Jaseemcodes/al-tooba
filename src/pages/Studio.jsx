import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ShimmerCard from '../components/ShimmerCard';
import { useToastStore } from '../store/toastStore';

export default function Studio() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  const showToast = useToastStore((state) => state.showToast);
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please complete all form fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to Al-Tooba.');
    setForm({ name: '', email: '', subject: 'general', message: '' });
  };

  // Simulate loading delay for skeleton shimmer
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms loading effect
    return () => clearTimeout(timer);
  }, [selectedCategory, sortBy]);

  const categories = ['All', 'Talbina', 'Skin Care', 'Hair Care', 'Herbal Oil', 'Herbal Tea', 'Vinegars', 'Prophetic Remedies'];

  // Sync category from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    } else if (cat) {
      setSelectedCategory(cat); // Even if it's not in the predefined list, it might be dynamically generated
    } else {
      setSelectedCategory('All');
    }
  }, [location.search]);

  // Handle category pill click
  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      navigate('/studio');
    } else {
      navigate(`/studio?category=${encodeURIComponent(cat)}`);
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Featured
  });

  return (
    <div className="bg-parchment min-h-screen">
      
      {/* Page Title with Cinematic Background - Full Width Edge to Edge */}
      <div className="w-full pt-[72px] sm:pt-[88px] mb-8 sm:mb-12 bg-parchment">
        <img 
          src="/products_banner.jpg" 
          alt="Products Banner" 
          className="w-full h-auto block"
        />
      </div>

      <div className="pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-forest/10 pb-8 mb-12">
          {/* Categories Filter Pills */}
          <div className="flex flex-wrap gap-2.5 pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`shrink-0 rounded-full px-5 py-2 text-xs font-sans font-bold uppercase tracking-wider transition-colors border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-forest border-forest text-parchment'
                    : 'border-forest/15 text-forest/80 hover:bg-forest/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-forest/60">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-forest/15 rounded-full px-4 py-2 text-xs font-sans font-bold text-forest focus:outline-none cursor-pointer outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-24 bg-white/40 border border-forest/5 rounded-3xl backdrop-blur-sm">
            <svg className="w-16 h-16 text-muted-green mx-auto mb-4 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18" />
            </svg>
            <h3 className="font-serif text-xl font-bold text-forest mb-2">No remedies found</h3>
            <p className="text-sm text-forest/60">Try selecting another category or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sortedProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}

        {/* Contact Us Section Appended to Studio */}
        <div className="mt-24 pt-16 border-t border-forest/10">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-sans font-bold uppercase tracking-[0.25em]">GET IN TOUCH</span>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-forest mt-3 tracking-tight">Connect With Us</h2>
            <p className="text-sm sm:text-base text-forest/70 max-w-xl mx-auto mt-4 leading-relaxed font-sans">
              Have questions about prophetic medicine, ingredients, or an active order? Reach out to our healing consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
            
            {/* Left Column: Contact details */}
            <div className="lg:col-span-5 bg-white border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-8">
              <div>
                <h3 className="font-serif font-bold text-xl text-forest mb-4">Apothecary Lab</h3>
                <p className="text-sm text-forest/75 leading-relaxed font-sans">
                  Al-Tooba® Prophetic Remedies Pvt. Ltd.<br />
                  Plot 12-C, Sector H-9/4, Industrial Area,<br />
                  Islamabad, Pakistan
                </p>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-forest mb-4">Direct Contact</h3>
                <ul className="space-y-3 text-sm text-forest/75 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-gold font-bold">📞</span>
                    <span>+92 (300) 111-TOOB (8662)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold font-bold">✉️</span>
                    <a href="mailto:healing@al-tooba.com" className="hover:text-gold transition-colors">healing@al-tooba.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold font-bold">💬</span>
                    <span>WhatsApp Support: +92 300 1234567</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-forest mb-4">Operational Hours</h3>
                <ul className="space-y-2 text-sm text-forest/75 font-sans">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">09:00 AM - 06:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 04:00 PM</span>
                  </li>
                  <li className="flex justify-between text-forest/40">
                    <span>Sunday</span>
                    <span className="italic">Closed (Rest Day)</span>
                  </li>
                </ul>
              </div>

              <div className="border border-forest/10 bg-forest/5 rounded-2xl p-6 text-center">
                <span className="text-xl mb-2 block">🕋</span>
                <h4 className="font-serif font-bold text-forest mb-1 text-sm">International Orders</h4>
                <p className="text-xs text-forest/70 font-sans leading-relaxed">
                  We ship to Saudi Arabia, UAE, UK, and USA. International inquiries can be forwarded to <a href="mailto:global@al-tooba.com" className="font-bold text-forest hover:text-gold">global@al-tooba.com</a>.
                </p>
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7 bg-white border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
              <h3 className="font-serif font-bold text-2xl text-forest mb-2">Send a Message</h3>
              <p className="text-xs sm:text-sm text-forest/60 mb-8 font-sans">
                Fill in your details below and we will contact you back as soon as possible.
              </p>

              {submitted ? (
                <div className="text-center py-12 bg-forest/5 rounded-2xl border border-forest/5">
                  <span className="text-4xl mb-4 block">✉️</span>
                  <h4 className="font-serif font-bold text-xl text-forest mb-2">Message Dispatched!</h4>
                  <p className="text-xs sm:text-sm text-forest/70 max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out. A botanical representative will review your message and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="rounded-full px-6 py-2.5 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#2b4c29] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3.5 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3.5 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Topic of Interest</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleInputChange}
                      className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3.5 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="consult">Remedy Consultation</option>
                      <option value="wholesale">Wholesale & Distribution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="Describe your inquiry in detail..."
                      className="w-full bg-parchment/20 border border-forest/10 rounded-3xl px-5 py-4 text-sm font-sans text-forest focus:outline-none focus:border-forest resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full py-4 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#2b4c29] transition-colors shadow-md cursor-pointer block text-center"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
