import { useEffect, useState } from 'react';

export function useLazyLoad(elementRef, threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(element); // Trigger once
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.disconnect();
    };
  }, [elementRef, threshold]);

  return isIntersecting;
}
