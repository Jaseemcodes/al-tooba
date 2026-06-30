import { useEffect, useRef } from 'react';

export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 112; // Reduced count by 50%

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height + canvas.height, // Start below screen or scattered
        radius: Math.random() * 4 + 2,        // Slightly larger bubbles
        speedY: -(Math.random() * 0.5 + 0.15), // Slightly faster upward drift
        speedX: Math.random() * 0.3 - 0.15,    // Subtle sideways drift
        opacity: Math.random() * 0.4 + 0.2,   // Higher opacity for more visibility
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 168, 106, ${p.opacity})`; // Golden bokeh (#c8a86a)
        ctx.fill();

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset particle if it drifts off top or sides
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-1 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
