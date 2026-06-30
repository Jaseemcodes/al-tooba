import React, { useState, useEffect, useRef } from 'react';

const CARD_IMAGES = [
  '/products/bs_new_1.jpg',
  '/products/bs_new_2.jpg',
  '/products/bs_new_3.jpg',
  '/products/bs_new_4.jpg',
  '/products/bs_new_1.jpg',
];

export default function About3DCarousel() {
  const cardCount = 5;
  const cardsRefs = useRef([]);
  const frameId = useRef(0);
  
  // Continuous scroll progress
  const progress = useRef(0);
  const isHovered = useRef(false);
  const speedMult = useRef(1);

  // Track mouse coordinates for interactive 3D parallax tilt with inertia damping
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Responsive state containing card dimensions
  const [metrics, setMetrics] = useState({
    cardW: 336,
    cardH: 211, // 1.59 standard credit card ratio
    isMobile: false,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Screen-space cursor offset relative to window center, clamped to [-1.0, 1.0] range
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      // Return gently to center orientation when mouse focus is lost or moves away
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // 1. Calculate Card Metrics (shrink cards if height is small to save vertical space)
      let cardW;
      if (w < 768) {
        // Larger base width on mobile for better visibility
        cardW = Math.round(w * 0.55);
      } else {
        cardW = Math.round(w * 0.16 + 130);
        const heightFactor = Math.min(1.0, Math.max(0.65, h / 850));
        cardW = Math.round(cardW * heightFactor);
      }
      
      cardW = Math.min(336, Math.max(180, cardW));
      const cardH = Math.round(cardW / 1.5925); // Standard credit card ratio

      setMetrics({ cardW, cardH, isMobile: w < 768 });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute positions, rotations, and visual rules at 60fps
  const renderLoop = () => {
    // Smooth speed transitions for hover pausing
    const targetSpeed = isHovered.current ? 0 : 1;
    speedMult.current += (targetSpeed - speedMult.current) * 0.05;

    // Upward flow speed of continuous transition
    // Mobile is slowed down by 50% to visually match the relaxed desktop speed across smaller dimensions
    const baseSpeed = metrics.isMobile ? 0.0066 : 0.0132;
    progress.current += baseSpeed * speedMult.current;

    // Smoothly interpolate current mouse variables towards their target positions (damping/inertia logic)
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const h = window.innerHeight;
    const { cardH } = metrics;

    const continuousProgress = progress.current;
    const roundedIndex = Math.round(continuousProgress);
    const diffFromRound = continuousProgress - roundedIndex; // ranges between [-0.5, 0.5]
    
    // Custom non-linear magnetic step logic
    // Using an exponent of 3.1 and speed of 0.0132 gives exactly a 0.60 second pause
    const easedDiff = Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 3.1) / 2;
    const virtualActiveIndex = roundedIndex + easedDiff;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      // Solve circular wrapping to get closest representation in [-cardCount/2, cardCount/2]
      let offset = i - virtualActiveIndex;
      const halfCount = cardCount / 2;
      while (offset > halfCount) offset -= cardCount;
      while (offset < -halfCount) offset += cardCount;

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      // Allow cards to render completely off-screen smoothly up to offset 3.0. This prevents any clipping or sudden pop-outs.
      if (absOffset > 3.0) {
        card.style.visibility = 'hidden';
        continue;
      } else {
        card.style.visibility = 'visible';
      }

      // Spacing gap between center card and adjacent cards
      const gap = 36;
      const peekAmount = -55; // Push the card's edge 55px past the screen boundary to hide a premium portion of it!
      const D = 1350; // Perspective distance

      const isMobile = metrics.isMobile;
      const dimension = isMobile ? metrics.cardW : metrics.cardH;
      const screenDim = isMobile ? window.innerWidth : window.innerHeight;

      let mainPos = 0;
      let z = 0;
      let rot = 0;

      if (absOffset <= 1) {
        // Smoothstep interpolation from 0 to 1 (Center card to first adjacent card)
        const t = absOffset;
        const easedT = t * t * (3 - 2 * t);

        const targetPos = dimension + gap;
        mainPos = -sign * (easedT * targetPos);

        z = 400 + easedT * (220 - 400);
        rot = easedT * 132;
      } else if (absOffset <= 2) {
        // Smoothstep interpolation from 1 to 2 (Adjacent card to peeking screen-edge card)
        const t = absOffset - 1;
        const easedT = t * t * (3 - 2 * t);

        const posStart = dimension + gap;
        const zStart = 220;
        const rotStart = 132;

        const zEnd = -60;
        const rotEnd = 175;

        // Perspective-aware formula for exact edge alignment at the screen boundary (peekAmount = 26px inside)
        const sEnd = D / (D - zEnd);
        const posEnd = (screenDim / 2 - peekAmount) / sEnd - (dimension / 2);

        mainPos = -sign * (posStart + easedT * (posEnd - posStart));

        z = zStart + easedT * (zEnd - zStart);
        rot = rotStart + easedT * (rotEnd - rotStart);
      } else {
        // Smoothstep interpolation from 2 to 3 (Peeking card to completely off-screen card)
        const t = Math.min(absOffset - 2, 1);
        const easedT = t * t * (3 - 2 * t);

        const zStart = -60;
        const rotStart = 175;

        const zEnd3 = -250;
        const rotEnd3 = 195;

        const sEnd2 = D / (D - zStart);
        const posEnd2 = (screenDim / 2 - peekAmount) / sEnd2 - (dimension / 2);

        // Calculate posEnd3 dynamically so that the card's edge is completely 100px past the screen boundary
        const sEnd3 = D / (D - zEnd3);
        const posEnd3 = (screenDim / 2 + 100) / sEnd3 + (dimension / 2);

        mainPos = -sign * (posEnd2 + easedT * (posEnd3 - posEnd2));

        z = zStart + easedT * (zEnd3 - zStart);
        rot = rotStart + easedT * (rotEnd3 - rotStart);
      }

      const localCardRotation = -sign * rot;

      // Determine how close this card is to the exact center (1.0 = center, 0.0 = adjacent/offscreen)
      const centerFactor = Math.max(0, 1 - absOffset);

      // Vertical tilt (around X-axis) and horizontal tilt (around Y-axis) driven by mouse coordinates
      const maxTiltY = 15; // Max angle tilt left-to-right (degrees)
      const maxTiltX = 12; // Max angle tilt up-and-down (degrees)

      const activeTiltX = -mouse.current.y * maxTiltX * centerFactor;
      const activeTiltY = mouse.current.x * maxTiltY * centerFactor;

      let finalX = 0;
      let finalY = 0;
      let totalRotX = 0;
      let totalRotY = 0;

      if (isMobile) {
        finalX = mainPos;
        totalRotY = localCardRotation + activeTiltY;
        totalRotX = activeTiltX;
      } else {
        finalY = mainPos;
        totalRotX = localCardRotation + activeTiltX;
        totalRotY = activeTiltY;
      }

      // Depth z-index layer
      card.style.zIndex = Math.round(z).toString();
      card.style.opacity = '1';

      // Inject translation matrix with the premium -3deg tilt combined with dynamic mouse-interactive 3D tilt
      card.style.transform = `translateX(${finalX.toFixed(2)}px) translateY(${finalY.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(-3deg)`;
    }
  };

  useEffect(() => {
    const tick = () => {
      renderLoop();
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [metrics]);

  // Slices for 3D volumetric depth with 30% reduced thickness
  // Span from -1.47px to 1.47px creates an extremely premium real 3D volume feel
  const thicknessLayers = [-1.47, -0.73, 0, 0.73, 1.47];

  return (
    <div 
      className="relative w-full h-[360px] sm:h-[550px] md:h-[626px] text-white flex flex-col items-center justify-center overflow-hidden select-none"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >


      {/* 3D perspective camera space */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none mt-10"
        style={{
          perspective: '1350px',
        }}
      >
        {/* Dynamic 3D coordinate viewport */}
        <div
          className="absolute"
          style={{
            width: `${metrics.cardW}px`,
            height: `${metrics.cardH}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { cardsRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{
                width: `${metrics.cardW}px`,
                height: `${metrics.cardH}px`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
              }}
            >
              {/* Build physical 3D volumetric thickness by dense parallel layering */}
              {thicknessLayers.map((zOffset, layerIdx) => {
                const isFrontFace = layerIdx === thicknessLayers.length - 1;
                const isBackFace = layerIdx === 0;

                const imgSrc = CARD_IMAGES[i % CARD_IMAGES.length];
                const baseBgColor = '#0f0f0f';

                // Middle structural slice
                if (!isFrontFace && !isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[16px] pointer-events-none overflow-hidden"
                      style={{
                        backgroundColor: '#1a1a1a',
                        transform: `translateZ(${zOffset}px)`,
                      }}
                    />
                  );
                }

                // Front face slice
                if (isFrontFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[16px] shadow-2xl ring-1 ring-black/10 pointer-events-none overflow-hidden"
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px)`,
                        backfaceVisibility: 'hidden',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)',
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt="Product visual"
                        className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
                      />
                      
                      {/* Subtle premium gradient overlay to make images pop and match the dark aesthetic */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 rounded-[16px]" />
                    </div>
                  );
                }

                // Back face slice
                if (isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[16px] shadow-2xl ring-1 ring-black/10 pointer-events-none overflow-hidden"
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px) ${metrics.isMobile ? 'rotateY(180deg)' : 'rotateX(180deg)'}`,
                        backfaceVisibility: 'hidden',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)',
                      }}
                    >
                      {/* Render flipped image for the back face */}
                      <img
                        src={imgSrc}
                        alt="Product visual back"
                        className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
                        style={{ transform: 'scaleX(-1)' }}
                      />
                      
                      <div className="absolute inset-0 bg-black/30 rounded-[16px]" />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
