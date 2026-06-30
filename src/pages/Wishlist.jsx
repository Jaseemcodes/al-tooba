import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="pt-24 pb-20 px-6 sm:px-8 bg-parchment min-h-screen">
      <div className="max-w-7xl mx-auto mt-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-forest/50 mb-10">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest">Your Wishlist</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-forest/10 pb-8 mb-12">
          <div>
            <span className="text-gold text-xs font-sans font-bold uppercase tracking-[0.25em]">YOUR CURATIONS</span>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-forest mt-3 tracking-tight">Saved Remedies</h1>
          </div>
          {items.length > 0 && (
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-forest/40">
              {items.length} {items.length === 1 ? 'Item' : 'Items'} Saved
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white/40 border border-forest/5 rounded-3xl backdrop-blur-sm max-w-2xl mx-auto">
            <svg className="w-16 h-16 text-muted-green mx-auto mb-4 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="font-serif text-xl font-bold text-forest mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-forest/60 mb-8 max-w-sm mx-auto">
              Save products here to easily track their availability, compare ingredients, and compile your custom prophetic remedy list.
            </p>
            <Link
              to="/studio"
              className="inline-block rounded-full px-8 py-4 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#2b4c29] transition-colors shadow-md"
            >
              Browse Remedies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
