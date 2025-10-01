import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const PreLoader = ({ setIsLoading }) => {
  const containerRef = useRef(null);
  const mobileButtonRef = useRef(null);
  
  // ✅ ADDED: Refs to manage the exit state and the auto-exit timer
  const hasExited = useRef(false);
  const autoExitTimer = useRef(null);

  useGSAP(() => {
    // --- Exit Animation Logic ---
    // A single, reusable function to handle the exit sequence.
    const exitPreloader = () => {
      // Prevent this from running more than once
      if (hasExited.current) return;
      hasExited.current = true;
      
      // ✅ ADDED: Kill the auto-exit timer if the user exits manually
      if (autoExitTimer.current) {
        autoExitTimer.current.kill();
      }
      
      // Stop the intro timeline if it's still running
      tl.kill();

      // Fade out the preloader
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(containerRef.current, { display: "none" });
          setIsLoading(false); // Update the state in App.jsx
        }
      });
    };

    // --- Intro Animation Timeline ---
    const tl = gsap.timeline({
        // ✅ ADDED: onComplete callback to start the 2-second auto-exit timer
        onComplete: () => {
            autoExitTimer.current = gsap.delayedCall(2, exitPreloader);
        }
    });

    tl.to(".preloader-text-1", { duration: 1.2, text: "CAPSLOCK SYSTEMS DEBUG ROM V1.0", ease: "none" })
      .to(".preloader-text-2", { duration: 0.8, text: "MEMORY CHECK...", ease: "none" }, "-=0.5")
      .to(".preloader-text-3", { duration: 0.8, text: "1024KB RAM OK", ease: "none" })
      .to(".preloader-text-4", { duration: 0.1, text: "> ", ease: "none" })
      .to(".preloader-text-4", { duration: 1.2, text: "> loading cpslck.com", ease: "none" })
      .to(".preloader-text-5", { duration: 0.8, text: "SYSTEM READY.", ease: "none" }, "+=0.3")
      .to(".preloader-text-6", { duration: 1.0, text: "(Press Caps Lock to enter)", ease: "none", delay: 0.5 })
      .to(mobileButtonRef.current, { autoAlpha: 1, duration: 0.5 }, "-=0.5");

    // --- Event Listeners ---
    const handleKeyDown = (event) => {
      // Use event.code for better consistency across keyboards
      if (event.code === 'CapsLock' || event.key === 'Meta') { // Meta key for Mac users
        exitPreloader();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Using the ref for the button
    const mobileButton = mobileButtonRef.current;
    if (mobileButton) {
        mobileButton.addEventListener('click', exitPreloader);
    }

    // --- Cleanup Function ---
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (mobileButton) {
          mobileButton.removeEventListener('click', exitPreloader);
      }
      // ✅ ADDED: Ensure the timer is killed if the component unmounts
      if (autoExitTimer.current) {
        autoExitTimer.current.kill();
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
            {/* ✅ CHANGED: This text now ONLY appears on desktop screens (1024px and up) */}
            <p className="preloader-text-6 text-neutral-500 hidden lg:block min-h-[1.5em]">&nbsp;</p>
            
            {/* ✅ CHANGED: This button now appears on mobile AND tablet (< 1024px) */}
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