// src/components/ui/FinalCTA.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FinalCTA = () => {
  const containerRef = useRef(null);
  const ctaWrapperRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: containerRef.current,
        scrub: 1,
      },
    });

    tl.fromTo(ctaWrapperRef.current, 
      { 
        width: 'clamp(320px, 90%, 384px)', 
        borderRadius: '27px', 
      },
      { 
        width: '100%', 
        borderRadius: '0px',
        ease: 'none',
      }
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="h-screen w-full flex justify-center items-end pb-4 bg-black"
    >
      <div 
        ref={ctaWrapperRef}
        className="w-full h-auto bg-[#D9D9D9] flex justify-center items-center p-2"
      >
        <button className="cta-button">
          <span className="cta-button-cap">
            <span className="cta-button-text font-display text-2xl">
              Get in Touch
            </span>
          </span>
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;