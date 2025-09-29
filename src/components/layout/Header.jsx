// src/components/layout/Header.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagnetic from '../../hooks/useMagnetic';

const MagneticLink = ({ children }) => {
  const magneticRef = useMagnetic();
  return React.cloneElement(children, { ref: magneticRef });
};

const Header = () => {
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // We define our start and end shapes here.
    // Both polygons MUST have the same number of points (12).
    const rabbetShape = "polygon(0% 15%, 4% 15%, 4% 0%, 96% 0%, 96% 15%, 100% 15%, 100% 85%, 96% 85%, 96% 100%, 4% 100%, 4% 85%, 0% 85%)";
    const rectangleShape = "polygon(0% 0%, 0% 0%, 0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 100%)";

    const ctx = gsap.context(() => {
      // Set the initial state using GSAP for consistency
      gsap.set(headerRef.current, { padding: '1rem' });
      gsap.set(containerRef.current, {
        maxWidth: '384px',
        padding: '1rem',
        clipPath: rabbetShape, // Start with the rabbet shape
      });
      
      const createAnimation = () => {
        if (gsap.getTweensOf([headerRef.current, containerRef.current]).length) {
          gsap.killTweensOf([headerRef.current, containerRef.current]);
        }
        
        const maxScroll = ScrollTrigger.maxScroll(window);
        const startPoint = maxScroll - 300;
        const endPoint = maxScroll;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: startPoint,
            end: endPoint,
            scrub: 1,
          },
        });

        tl.to(headerRef.current, { padding: '0px', ease: 'none' })
          .to(containerRef.current, {
            maxWidth: '100%',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            // ✅ Animate the clipPath to the rectangle shape
            clipPath: rectangleShape,
            ease: 'none',
          }, "<");
      };

      createAnimation();
      ScrollTrigger.addEventListener("refresh", createAnimation);
    });

    return () => ctx.revert();

  }, []);

  return (
    <header ref={headerRef} className="fixed bottom-0 left-0 w-full z-50 p-4">
      <div 
        ref={containerRef}
        className="flex justify-center items-center bg-[#BCBCBC] w-full max-w-sm mx-auto p-4 rounded-lg"
      >
        {/* ✅ KEY CHANGE: Added px-8 for breathing room */}
        <div className="w-full flex justify-between items-center px-8">
          <MagneticLink>
            <a href="/" className="flex items-center">
              <img src="/assets/Logo.svg" alt="Capslock Logo" className="h-6 w-auto"/>
            </a>
          </MagneticLink>
          <MagneticLink>
            <a href="mailto:cpslck.info@gmail.com" className="font-body text-black flex items-center text-lg">
              email us
              <img src="/assets/Computer Icon.svg" alt="Email Icon" className="h-6 w-auto"/>
            </a>
          </MagneticLink>
        </div>
        
      </div>
    </header>
  );
};

export default Header;