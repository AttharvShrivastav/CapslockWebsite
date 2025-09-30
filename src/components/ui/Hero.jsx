// src/components/ui/Hero.jsx
import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

// Reverting to simple image imports as requested
import capslockLogo from '/assets/LogoHero.svg';
import keyboardGraphic from '/assets/Keyboard.svg';

const Hero = () => {
  const containerRef = React.useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // ✅ New, corrected animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

      // 1. Logo Reveal (First)
      tl.from(".hero-logo", {
        opacity: 0,
        scale: 0.9,
        y: 40,
        duration: 1.2,
      });

      // 2. Keyboard "Float Up" Reveal (Second)
      tl.from(".keyboard-container", {
        opacity: 0,
        y: 100, // Increased y for a "floating" feel
        scale: 0.95,
        duration: 1.0,
      }, "-=0.9"); // Overlap slightly with the logo animation for a smooth transition

      // 3. Masked Character Text Reveal (Last)
      const textElements = gsap.utils.toArray('.reveal-text-chars');
      textElements.forEach(el => {
        const splitParent = new SplitText(el, { type: "lines", linesClass: "line-parent" });
        const splitChild = new SplitText(el, { type: "chars", linesClass: "line-child" });
        
        gsap.set(splitParent.lines, { overflow: 'hidden' });
        
        tl.from(splitChild.chars, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.005,
          duration: 0.8,
          ease: 'power2.out',
        }, "-=0.8"); // Overlap slightly with the keyboard animation
      });

      // --- Parallax Animations (Unchanged) ---
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;
        gsap.to(".parallax-mouse-soft", { x: -20 * xPercent, y: -20 * yPercent, duration: 0.8, ease: "power2.out" });
        gsap.to(".parallax-mouse-hard", { x: -40 * xPercent, y: -40 * yPercent, duration: 0.8, ease: "power2.out" });
      };
      window.addEventListener('mousemove', handleMouseMove);

      gsap.to(".hero-logo-container", { scrollTrigger: { trigger: containerRef.current, start: "top top", scrub: 1.5 }, y: -250, ease: 'none' });
      gsap.to(".hero-text-content", { scrollTrigger: { trigger: containerRef.current, start: "top top", scrub: 1.5 }, y: -100, ease: 'none' });
      gsap.to(".keyboard-container", { scrollTrigger: { trigger: containerRef.current, start: "top top", scrub: 1.5 }, y: -150, ease: 'none' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen bg-[#252525] text-white flex flex-col justify-between py-12 md:py-12 px-6 md:px-8 overflow-hidden"
    >
      <div className="w-full flex items-center justify-center hero-logo-container parallax-mouse-hard">
        <img 
          src={capslockLogo} 
          alt="Capslock Logo"
          className="w-[70vw] max-w-7xl h-auto hero-logo"
        />
      </div>

      <div className="w-full flex justify-between items-end gap-8">
        <div className="hero-text-content mx-24 max-w-md parallax-mouse-soft">
          <h2 className="reveal-text-chars text-left text-4xl font-display font-medium mb-2">welcome</h2>
          <hr className="w-42 border-white mb-4" />
          <p className="reveal-text-chars text-base font-body text-neutral-300 mb-4">
            no lowercase ambition.<br /> capslock is a creative studio for brands with taste and trajectory. we pair conversion-first strategy with design-to-dev craft that just works.
          </p>
          <p className="reveal-text-chars font-body text-neutral-500">
            studio / indore, india
          </p>
        </div>
        
        <div className="hidden md:block absolute right-0 top-1/2 keyboard-container parallax-mouse-soft">
          {/* Reverted to a simple <img> tag */}
          <img 
            src={keyboardGraphic} 
            alt="Stylized keyboard graphic" 
            className="w-[340px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;