// src/components/ui/Preloader.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const PreLoader = ({ setIsLoading }) => {
  const containerRef = useRef(null);
  const hasExited = useRef(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    const exitPreloader = () => {
      if (hasExited.current) return;
      hasExited.current = true;
      
      tl.kill();

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(containerRef.current, { display: "none" });
          setIsLoading(false);
        }
      });
    };

    tl.to(".preloader-text-1", { duration: 1.2, text: "CAPSLOCK SYSTEMS DEBUG ROM V1.0", ease: "none" })
      .to(".preloader-text-2", { duration: 0.8, text: "MEMORY CHECK...", ease: "none" }, "-=0.5")
      .to(".preloader-text-3", { duration: 0.8, text: "1024KB RAM OK", ease: "none" })
      .to(".preloader-text-4", { duration: 0.1, text: "> ", ease: "none" })
      .to(".preloader-text-4", { duration: 1.2, text: "> loading cpslck.com", ease: "none" })
      .to(".preloader-text-5", { duration: 0.8, text: "SYSTEM READY.", ease: "none" }, "+=0.3")
      .to(".preloader-text-6", { duration: 1.0, text: "(Press Caps Lock to enter)", ease: "none", delay: 0.5 })
      // ✅ FIX: Animate the mobile button into view at the end
      .to("#mobile-enter-wrapper", { autoAlpha: 1, duration: 0.5 }, "-=0.5");

    const handleKeyDown = (event) => {
      if (event.key === 'CapsLock' || event.code === 'CapsLock' || event.key === 'Meta') {
        exitPreloader();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const mobileButton = document.querySelector('#mobile-enter-button');
    if (mobileButton) {
        mobileButton.addEventListener('click', exitPreloader);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (mobileButton) {
          mobileButton.removeEventListener('click', exitPreloader);
      }
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black text-green-400 font-body flex justify-center items-center z-[100]"
    >
      <div className="w-full max-w-2xl p-8 text-lg md:text-xl text-center">
        <div className="text-left">
          <p className="preloader-text-1">&nbsp;</p>
          <p className="preloader-text-2">&nbsp;</p>
          <p className="preloader-text-3">&nbsp;</p>
          <br/>
          <p>
            <span className="preloader-text-4">&nbsp;</span>
            <span className="blinking-cursor">_</span>
          </p>
          <p className="preloader-text-5">&nbsp;</p>
        </div>
        
        <div className="mt-8">
            <p className="preloader-text-6 text-neutral-500">&nbsp;</p>
            {/* ✅ FIX: Added a wrapper div with an ID and set it to be initially invisible */}
            <div id="mobile-enter-wrapper" className="mt-8 md:hidden invisible">
                <button id="mobile-enter-button" className="cta-button">
                    <span className="cta-button-preload">
                        <span className="cta-button-text font-display text-2xl">
                        Capslock
                        </span>
                    </span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;