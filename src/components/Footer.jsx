import { Link } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';
import logoSrc from '../assets/logo.png';

export default function Footer() {
  const showToast = useToastStore((state) => state.showToast);

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      showToast(`Thank you for subscribing, ${email}!`);
      e.target.reset();
    }
  };

  return (
    <footer className="relative bg-forest text-[#90b09a] pt-16 pb-8 overflow-hidden z-10 border-t border-parchment/10">
      {/* Decorative botanical leaf line elements or fade overlays */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-parchment/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="inline-block w-[180px] hover:opacity-95 transition-opacity">
              <img src={logoSrc} alt="Al-Tooba Logo" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-green">
              Al Tooba® provides premium prophetic remedies and organic wellness solutions crafted with pure natural essence, shared with love.
            </p>
            
            {/* Newsletter form */}
            <form onSubmit={handleSubscribeSubmit} className="relative w-full max-w-sm flex items-center bg-transparent border border-parchment/30 rounded-full px-1 py-1">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter Email Address"
                className="w-full pl-4 pr-3 py-2 bg-transparent text-parchment placeholder-muted-green outline-none border-none text-xs focus:ring-0"
              />
              <button
                type="submit"
                className="rounded-full px-5 py-2 bg-gold hover:bg-[#b09359] text-forest text-[11px] font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 2: Discover */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-sans font-bold uppercase tracking-[0.18em] text-parchment">
              Discover
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#labs" className="hover:text-parchment transition-colors">
                  Labs & Workshops
                </a>
              </li>
              <li>
                <a href="#herbals" className="hover:text-parchment transition-colors">
                  Pure Herbals
                </a>
              </li>
              <li>
                <a href="#sourcing" className="hover:text-parchment transition-colors">
                  Botanical Sourcing
                </a>
              </li>
              <li>
                <a href="#prophetic" className="hover:text-parchment transition-colors">
                  Prophetic Science
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-parchment transition-colors">
                  Wellness Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Mission */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-sans font-bold uppercase tracking-[0.18em] text-parchment">
              The Mission
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-parchment transition-colors">
                  Origin Story
                </Link>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-parchment transition-colors">
                  Pure Ingredients
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-parchment transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-parchment transition-colors">
                  Join Our Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Concierge */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-sans font-bold uppercase tracking-[0.18em] text-parchment">
              Concierge
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact-us" className="hover:text-parchment transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-parchment transition-colors">
                  Legal Privacy
                </a>
              </li>
              <li>
                <a href="#agreement" className="hover:text-parchment transition-colors">
                  User Agreement
                </a>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-parchment transition-colors">
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 border-t border-parchment/10 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#5a8060] font-sans font-semibold tracking-wider">
            © {new Date().getFullYear()} AL-TOOBA® PROPHETIC REMEDIES PVT. LTD. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[11px] text-[#5a8060] font-sans font-semibold tracking-wider">
            DESIGNED & CRAFTED FOR WELLNESS & PURITY.
          </p>
        </div>
      </div>
    </footer>
  );
}
