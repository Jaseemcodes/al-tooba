import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useToastStore } from '../store/toastStore';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, index = 0 }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);
  const [showHoverImg, setShowHoverImg] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const showToast = useToastStore((state) => state.showToast);

  // Alternating background color for image area
  const isEven = index % 2 === 0;
  const imageBgColor = isEven ? 'bg-forest-light' : 'bg-warm-light';

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        boxShadow: '0 20px 40px rgba(31, 58, 29, 0.08)',
        borderColor: '#c8a86a',
        duration: 0.3,
        ease: 'power2.out'
      });
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scale: 1.08,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1.0,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        borderColor: '#ddd5c4',
        duration: 0.3,
        ease: 'power2.out'
      });
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scale: 1.0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const hoverImage = product.cardHoverImage || (product.images && product.images.length > 1 ? product.images[1] : null);

  const handleMouseMove = (e) => {
    if (!hoverImage || !imgContainerRef.current) return;
    const { left, width } = imgContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    setShowHoverImg(x / width > 0.5);
  };

  const handleMouseLeaveImg = () => {
    setShowHoverImg(false);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product.inStock) {
      showToast('Product is out of stock', 'error');
      return;
    }
    addItem(product);
    showToast(`Added ${product.name} to cart`);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    showToast(isWishlisted ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`);
  };

  // Badge mapping
  let badgeClass = 'bg-forest text-parchment';
  if (product.badge === 'NEW') badgeClass = 'bg-[#2e5c46] text-parchment';
  if (product.badge === 'LIMITED') badgeClass = 'bg-[#7a2020] text-parchment';

  return (
    <div
      ref={cardRef}
      className="w-full rounded-[24px] md:rounded-[32px] bg-[#FAF6F0] p-3 md:p-4 flex flex-row md:flex-col md:h-[520px] transition-all relative group shadow-sm border border-black/5 gap-3 md:gap-0"
    >
      {/* Category Badge - Overhanging right edge */}
      <div className="absolute top-2 right-0 md:top-8 md:right-0 z-20 bg-[#F3EBE0] text-[#D1A551] text-[9px] md:text-[11px] font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-l-[8px] md:rounded-l-[12px] shadow-sm uppercase tracking-wider">
        {product.category || 'Product'}
      </div>

      {/* Image Container (Left on mobile, Top on desktop) */}
      <div className="w-[40%] md:w-full shrink-0 flex flex-col">
        <Link to={`/product/${product.slug}`} className="block h-full">
          <div 
            ref={imgContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeaveImg}
            className="w-full aspect-[4/5] md:aspect-auto md:h-[260px] rounded-[16px] md:rounded-[24px] bg-[#F0EBE1] flex items-center justify-center overflow-hidden relative md:mb-5 shadow-inner"
          >
            <img
              ref={imgRef}
              src={showHoverImg && hoverImage ? hoverImage : (product.cardImage || product.images[0])}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 backdrop-blur-sm">
                <span className="text-[10px] md:text-sm font-sans font-bold tracking-widest px-2 py-1 md:px-4 md:py-2 rounded-full uppercase bg-[#7a2020] text-parchment">
                  SOLD OUT
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Content Container (Right on mobile, Bottom on desktop) */}
      <div className="flex flex-col flex-1 relative py-1 md:py-0">
        <Link to={`/product/${product.slug}`} className="flex-grow flex flex-col block">
          <div className="px-1 flex-grow flex flex-col">
            {/* Brand & Rating */}
            <div className="flex justify-between items-center mb-1.5 md:mb-3 mt-4 md:mt-0">
              <span className="text-[10px] md:text-[11px] font-bold text-[#8A959E] uppercase tracking-widest hidden sm:block">AL-TOOBA</span>
              <div className="flex items-center gap-1 text-[11px] md:text-[13px] font-medium text-[#8A959E]">
                <span className="text-[#D4A24C] text-[13px] md:text-[15px] mb-0.5">★</span> 
                <span className="text-[#5C6670]">{product.rating || '4.8'}</span> 
                <span className="text-[#D3D8DD] mx-0.5">|</span> 
                <span>{product.reviewCount || '38'}</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="font-serif font-bold text-[16px] md:text-[22px] text-[#0D3B2A] mb-2 md:mb-3 leading-tight line-clamp-2">{product.name}</h3>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-1.5 md:gap-3 mt-auto pb-1 md:pb-2">
              <span className="text-[18px] md:text-[26px] font-bold text-[#D4A24C]">₹{product.price.toFixed(0)}</span>
              {product.mrp > product.price && (
                <span className="text-[12px] md:text-[16px] text-[#8A959E] line-through font-medium">₹{product.mrp.toFixed(0)}</span>
              )}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <div className="mt-2 md:mt-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full rounded-[12px] md:rounded-[16px] py-2.5 md:py-4 text-[11px] md:text-[14px] font-sans font-bold uppercase tracking-widest bg-[#0D3B2A] text-white hover:bg-[#154c38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 md:gap-2.5 cursor-pointer shadow-lg"
          >
            <span className="md:hidden">{product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}</span>
            <span className="hidden md:inline">{product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}</span>
            {product.inStock && (
              <svg className="w-3.5 h-3.5 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
