import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

import capslockLogo from '/assets/LogoHero.svg';
import keyboardGraphic from '/assets/Keyboard.svg';

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });
      
      tl.from(".hero-logo", { 
        opacity: 0, 
        scale: 0.9, 
        y: 40, 
        duration: 1.2 
      })
      .from(".keyboard-container", { 
        opacity: 0, 
        y: 100, 
        scale: 0.95, 
        duration: 1.0 
      }, "-=0.9");
      
      const textElements = gsap.utils.toArray('.reveal-text-chars');
      textElements.forEach(el => {
        const splitParent = new SplitText(el, { type: "lines", linesClass: "line-parent" });
        const splitChild = new SplitText(el, { type: "words", linesClass: "line-child", smartWrap: "true" });
        gsap.set(splitParent.lines, { overflow: 'hidden' });
        tl.from(splitChild.chars, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.005,
          duration: 0.8,
          ease: 'power2.out',
        }, "-=0.8");
      });

      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
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

        return () => window.removeEventListener('mousemove', handleMouseMove);
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.to(".hero-logo-container", { scrollTrigger: { trigger: containerRef.current, start: "top top", scrub: 2 }, y: -100, ease: 'none' });
        gsap.to(".hero-text-content", { scrollTrigger: { trigger: containerRef.current, start: "top top", scrub: 2 }, y: -50, ease: 'none' });
        gsap.to(".keyboard-container", { scrollTrigger: { trigger: containerRef.current, start: "top top", scrub: 2 }, y: -75, ease: 'none' });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen h-[100svh] bg-[#252525] text-white flex flex-col justify-between py-12 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="w-full flex items-center justify-center hero-logo-container parallax-mouse-hard">
        <img 
          src={capslockLogo} 
          alt="Capslock Logo"
          className="w-[85vw] md:w-[70vw] max-w-7xl h-auto hero-logo"
        />
      </div>

      <div className="w-full flex justify-start items-start gap-8">
        <div className="hero-text-content max-w-md lg:mx-24 parallax-mouse-soft">
          <h2 className="reveal-text-chars text-3xl md:text-4xl font-display font-medium mb-2">welcome</h2>
          <hr className="w-42 border-white mb-4" />
          <p className="reveal-text-chars text-base font-body text-neutral-300 mb-4 break-words">
            no lowercase ambition.<br /> capslock is a creative studio for brands with taste and trajectory. we pair conversion-first strategy with design-to-dev craft that just works.
          </p>
          <p className="reveal-text-chars font-body text-neutral-500">
            studio / indore, india
          </p>
        </div>
        
        <div className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 items-center justify-center keyboard-container parallax-mouse-soft">
          <img 
            src={keyboardGraphic} 
            alt="Stylized keyboard graphic" 
            className="w-[240px] lg:w-[340px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;