// src/components/ui/PreFooterCTA.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagnetic from '../../hooks/useMagnetic'; // Import your magnetic hook

const PreFooterCTA = () => {
  const containerRef = useRef(null);
  const magneticButtonRef = useMagnetic(); // Apply the magnetic hook to the button
  const capRef = useRef(null); // A ref for the inner part of the button we want to animate

  // Reveal animation for the section content
  useGSAP(() => {
    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });
  }, { scope: containerRef });

  // ✅ New GSAP animation for the click effect
  const handleClick = () => {
    gsap.to(capRef.current, {
      scale: 0.93,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(capRef.current, {
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.75)', // This creates the bounce effect
        });
      }
    });
  };

  return (
    <section 
      id="cta-section"
      ref={containerRef}
      className="bg-[#252525] min-h-[110vh] text-white flex flex-col justify-center items-center text-center py-32 md:py-48"
    >
      <h2 className="font-body  lowercase text-xl md:text-xl max-w-4xl mb-12">
        Have a project that needs a little bit of capslock?
      </h2>


      <button 
        ref={magneticButtonRef}
        className="cta-button"
        onClick={handleClick}
      >
        <span ref={capRef} className="cta-button-cap">
          <span className="cta-button-text font-display text-2xl">
            Let's Talk
          </span>
        </span>
      </button>
    </section>
  );
};

export default PreFooterCTA;