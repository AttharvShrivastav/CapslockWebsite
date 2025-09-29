// src/components/ui/About.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';

import imageSamanyu from '/assets/samanyu.jpg';
import imageAtharv from '/assets/atharv.jpg';

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // ✅ This is the advanced "masked, character-by-character" reveal logic.
    const textElements = gsap.utils.toArray('.reveal-text');
    textElements.forEach(el => {
      const splitParent = new SplitText(el, { type: "lines", linesClass: "line-parent" });
      const splitChild = new SplitText(el, { type: "chars", linesClass: "line-child" });
      
      gsap.set(splitParent.lines, { overflow: 'hidden' });
      
      gsap.from(splitChild.chars, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.008,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    // Animation logic for image reveals (unchanged)
    const imageElements = gsap.utils.toArray('.reveal-image');
    imageElements.forEach(el => {
      const image = el.querySelector('img');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, start: 'top 90%', toggleActions: 'play none none reverse',
        }
      });
      tl.set(el, { autoAlpha: 1 });
      tl.set(image, { scale: 1.2, transformOrigin: 'center center' });
      tl.from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power3.out' })
        .to(image, { scale: 1, duration: 1.2, ease: 'power3.out' }, "<");
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="bg-[#D9D9D9] text-black min-h-screen flex flex-col justify-between py-12 md:py-12 px-6 md:px-8"
    >
      {/* --- TOP BLOCK: Heading --- */}
      <div className="mx-auto max-w-7xl w-full">
        <h2 className="font-display text-4xl">
          about us
          <span className="text-red-500">.</span>
        </h2>
      </div>

      {/* --- BOTTOM BLOCK: Main Content Grid --- */}
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-5 gap-16">
        
        {/* Left Column of Bottom Block (40%) */}
        <div className="md:col-span-2 flex flex-col justify-end">
          <div>
            {/* This text block will now use the character reveal animation */}
            <p className="reveal-text font-body text-base text-neutral-600 leading-relaxed">
              <span className='text-accent'>capslock</span> began as a simple name for a different idea. but the intent was always the same. it grew with us from a word into a vessel for all things creative.
            </p>
          </div>
        </div>

        {/* Right Column of Bottom Block (60%) */}
        <div className="md:col-span-3">
          <div className="flex flex-col sm:flex-row gap-8 items-end justify-end">
            
            <div className="flex flex-col justify-between w-full sm:w-auto">
              <p className="reveal-text font-body text-base text-neutral-700 leading-relaxed w-[260px] text-justify">
                the architect of the brand. he focuses on the narrative, the aesthetic, and the simple human truth that makes an idea connect.
              </p>
              <div className="reveal-image w-[250px] aspect-[3/4] invisible my-6">
                <img 
                  src={imageSamanyu} 
                  alt="Samanyu Jain" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="reveal-text font-body text-base text-neutral-800">samanyu jain</p>
            </div>

            <div className="flex flex-col justify-between items-end text-right w-full sm:w-auto">
              <p className="reveal-text font-body text-base text-neutral-700 leading-relaxed w-[260px] text-justify">
                the architect of the build. he translates vision into flawless code, ensuring the experience feels as good as it looks.
              </p>
              <div className="reveal-image w-[250px] aspect-[3/4] invisible my-6">
                <img 
                  src={imageAtharv} 
                  alt="Atharv Shrivastav" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="reveal-text font-body text-base text-neutral-800">attharv shrivastav</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;