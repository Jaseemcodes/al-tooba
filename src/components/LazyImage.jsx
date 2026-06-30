import { useRef } from 'react';
import { useLazyLoad } from '../hooks/useLazyLoad';

export default function LazyImage({ src, alt, className = '', ...props }) {
  const imgRef = useRef(null);
  const isLoaded = useLazyLoad(imgRef);

  return (
    <div ref={imgRef} className={`relative overflow-hidden bg-forest-light ${className}`}>
      {/* Shimmer state while not loaded */}
      {!isLoaded && <div className="absolute inset-0 shimmer" />}
      
      <img
        src={isLoaded ? src : ''}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
