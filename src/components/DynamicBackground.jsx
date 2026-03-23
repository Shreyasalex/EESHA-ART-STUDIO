import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DynamicBackground = () => {
  const bgRef = useRef(null);
  const mandalaRef = useRef(null);

  useEffect(() => {
    // Initial state: visible at hero scale
    gsap.set(mandalaRef.current, { 
      opacity: 0.18, // Slightly more visible for a premium feel
      scale: 1,
      rotate: 0 
    });

    // Continuous slow rotation (independent of scroll)
    gsap.to(mandalaRef.current, {
      rotate: 360,
      duration: 120, // Slower, more hypnotic
      repeat: -1,
      ease: "none"
    });

    // Immersive Scroll-based zoom (deep into the center)
    gsap.to(mandalaRef.current, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Tighter scrub for more direct response
      },
      scale: 8, // Deep zoom into the center
      opacity: 0.12, // Maintain visibility even when zoomed
      rotate: '+=60',
      ease: "power1.inOut" // Smoother start/end
    });

    // Subtle Parallax on Mouse Move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(mandalaRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={bgRef}
      className="dynamic-bg-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'var(--bg-light)', // Keep original background color
      }}
    >
      <div 
        ref={mandalaRef}
        className="floating-mandala"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 800px)',
          height: 'min(90vw, 800px)',
          backgroundImage: "url('/background/new_mandala.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply', // Makes white background of PNG transparent on cream
          filter: 'contrast(0.7) brightness(1.2) sepia(0.2)', // Soft elegant tone
        }}
      />
      
      {/* Decorative texture overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/background/texture.png')",
          opacity: 0.03,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default DynamicBackground;
