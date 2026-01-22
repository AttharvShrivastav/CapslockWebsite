// src/components/ui/PreFooterCTA.jsx
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagnetic from '../../hooks/useMagnetic'; 

const PreFooterCTA = () => {
  const containerRef = useRef(null);
  const magneticButtonRef = useMagnetic(); 
  const capRef = useRef(null); 
  const copiedRef = useRef(null); // Ref for the "Copied!" indicator
  const [isCopied, setIsCopied] = useState(false);

  const email = "cpslck.info@gmail.com";

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

  // ✅ Click effect + Mailto + Copy to Clipboard
  const handleClick = () => {
    // 1. Physical click animation
    gsap.to(capRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(capRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1.2, 0.5)',
        });
        
        // 2. Fallback: Copy to Clipboard
        navigator.clipboard.writeText(email).then(() => {
          setIsCopied(true);
          
          // Animate the "Copied!" text
          gsap.fromTo(copiedRef.current, 
            { opacity: 0, y: 10 }, 
            { opacity: 1, y: -20, duration: 0.4, ease: "power3.out" }
          );

          // Reset status after 2 seconds
          gsap.delayedCall(2, () => {
            gsap.to(copiedRef.current, { 
              opacity: 0, 
              duration: 0.3, 
              onComplete: () => setIsCopied(false) 
            });
          });
        });

        // 3. Trigger mailto
        window.location.href = `mailto:${email}`;
      }
    });
  };

  return (
    <section 
      id="cta-section"
      ref={containerRef}
      className="bg-[#252525] min-h-[110vh] text-white flex flex-col justify-center items-center text-center py-32 md:py-48"
    >
      <h2 className="font-body lowercase text-xl md:text-xl max-w-4xl mb-12">
        Have a project that needs a little bit of capslock?
      </h2>

      <div className="relative inline-block">
        {/* Visual Confirmation Indicator */}
        <span 
          ref={copiedRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none font-body text-xs text-neutral-400 opacity-0"
        >
          Email Copied!
        </span>

        <button 
          ref={magneticButtonRef}
          className="cta-button"
          onClick={handleClick}
        >
          <span ref={capRef} className="cta-button-cap block">
            <span className="cta-button-text font-display text-2xl">
              Let's Talk
            </span>
          </span>
        </button>
      </div>
    </section>
  );
};

export default PreFooterCTA;