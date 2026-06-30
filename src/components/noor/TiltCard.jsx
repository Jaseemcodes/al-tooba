import { useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function TiltCard({ children, className }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rX = ((mouseY / height) - 0.5) * -15; // max tilt 15deg
    const rY = ((mouseX / width) - 0.5) * 15;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ 
        perspective: 1000, 
        transformStyle: 'preserve-3d',
        WebkitFontSmoothing: 'antialiased',
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      }}
      className={`relative ${className}`}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
