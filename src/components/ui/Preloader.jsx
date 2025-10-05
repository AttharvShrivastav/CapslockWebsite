import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const PreLoader = ({ setIsLoading }) => {
  const containerRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const hasExited = useRef(false);

  useGSAP(() => {
    // Create a Promise that resolves when the timeline animation is complete
    const animationPromise = new Promise(resolve => {
      const tl = gsap.timeline({ onComplete: resolve });

      tl.to(".preloader-text-1", { duration: 1.2, text: "CAPSLOCK SYSTEMS DEBUG ROM V1.0", ease: "none" })
        .to(".preloader-text-2", { duration: 0.8, text: "MEMORY CHECK...", ease: "none" }, "-=0.5")
        .to(".preloader-text-3", { duration: 0.8, text: "1024KB RAM OK", ease: "none" })
        .to(".preloader-text-4", { duration: 0.1, text: "> ", ease: "none" })
        .to(".preloader-text-4", { duration: 1.2, text: "> loading cpslck.com", ease: "none" })
        .to(".preloader-text-5", { duration: 0.8, text: "SYSTEM READY.", ease: "none" }, "+=0.3")
        .to(".preloader-text-6", { duration: 1.0, text: "(Press Caps Lock to enter)", ease: "none", delay: 0.5 })
        .to(mobileButtonRef.current, { autoAlpha: 1, duration: 0.5 }, "-=0.5");
    });

    const exitPreloader = () => {
      if (hasExited.current) return;
      hasExited.current = true;
      
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

    // Wait for both animation and fonts to be ready before auto-exiting
    Promise.all([animationPromise, document.fonts.ready]).then(() => {
      exitPreloader();
    });

    // Event Listeners for manual exit
    const handleManualExit = () => {
      // Still wait for fonts before finishing, even on manual exit.
      document.fonts.ready.then(() => {
        exitPreloader();
      });
    };

    const handleKeyDown = (event) => {
      if (event.code === 'CapsLock' || event.key === 'Meta') {
        handleManualExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    const mobileButton = mobileButtonRef.current;
    if (mobileButton) {
        mobileButton.addEventListener('click', handleManualExit);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (mobileButton) {
          mobileButton.removeEventListener('click', handleManualExit);
      }
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black text-green-400 font-mono flex justify-center items-center z-[100]"
      role="status"
      aria-live="polite"
      aria-label="Loading capslock systems"
    >
      <div className="w-full max-w-2xl p-8 text-lg md:text-xl">
        <div className="text-left">
          <p className="preloader-text-1 min-h-[1.5em]">&nbsp;</p>
          <p className="preloader-text-2 min-h-[1.5em]">&nbsp;</p>
          <p className="preloader-text-3 min-h-[1.5em]">&nbsp;</p>
          <br/>
          <p>
            <span className="preloader-text-4 min-h-[1.5em]">&nbsp;</span>
            <span className="blinking-cursor">_</span>
          </p>
          <p className="preloader-text-5 min-h-[1.5em]">&nbsp;</p>
        </div>
        
        <div className="mt-8 text-center">
            <p className="preloader-text-6 text-neutral-500 hidden lg:block min-h-[1.5em]">&nbsp;</p>
            <div ref={mobileButtonRef} className="mt-4 lg:hidden invisible">
                <button 
                  className="bg-green-400 text-black font-display text-2xl uppercase py-3 px-8 transition-colors duration-300 hover:bg-white"
                  aria-label="Enter Website"
                >
                  Enter
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;