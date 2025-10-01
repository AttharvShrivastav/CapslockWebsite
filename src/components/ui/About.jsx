import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

import imageSamanyu from '/assets/samanyu.jpg';
import imageAtharv from '/assets/atharv.jpg';

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const profileBlocks = gsap.utils.toArray('.profile-block');

    profileBlocks.forEach(block => {
      const textElements = block.querySelectorAll('.reveal-text');
      const imageElement = block.querySelector('.reveal-image');
      const image = imageElement ? imageElement.querySelector('img') : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // ✅ REFINED: Reverted to the masked text reveal animation.
      textElements.forEach(el => {
        const splitParent = new SplitText(el, { type: "lines", linesClass: "line-parent" });
        const splitChild = new SplitText(el, { type: "words" });
        
        gsap.set(splitParent.lines, { overflow: 'hidden' });
        
        tl.from(splitChild.words, {
          duration: 0.8,
          ease: 'power2.out',
          yPercent: 100,
          stagger: 0.01,
        }, 0);
      });

      if (imageElement && image) {
        tl.set(imageElement, { autoAlpha: 1 }, 0.1)
          .set(image, { scale: 1.2, transformOrigin: 'center center' }, 0.1)
          .from(imageElement, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power3.out' }, 0.2)
          .to(image, { scale: 1, duration: 1.2, ease: 'power3.out' }, 0.2);
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="bg-[#D9D9D9] text-black py-24 md:py-32 px-6 md:px-8"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-5xl">
            about us
            <span className="text-accent">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          <div className="md:col-span-2 flex flex-col justify-end">
            <div>
              <p className="reveal-text font-body text-base text-neutral-600 leading-relaxed max-w-md">
                <span className='text-accent'>capslock</span> began as a simple name for a different idea. but the intent was always the same. it grew with us from a word into a vessel for all things creative.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="flex flex-col md:flex-row gap-12 md:gap-8 md:items-end md:justify-end">
              
              <div className="profile-block w-[90%] md:w-full max-w-xs mr-auto md:mr-0">
                <p className="reveal-text font-body text-base text-neutral-700 leading-relaxed text-justify hyphens-auto">
                  the architect of the brand. he focuses on the narrative, the aesthetic, and the simple human truth that makes an idea connect.
                </p>
                {/* ✅ REFINED: Added whitespace-nowrap to prevent line breaks on mobile. */}
                <p className="reveal-text font-body text-base text-neutral-800 mt-2 md:hidden whitespace-nowrap">samanyu jain</p>
                <div className="reveal-image w-full aspect-[3/4] invisible my-6">
                  <img src={imageSamanyu} alt="Samanyu Jain" className="w-full h-full object-cover" />
                </div>
                <p className="reveal-text font-body text-base text-neutral-800 hidden md:block whitespace-nowrap">samanyu jain</p>
              </div>
              
              <div className="profile-block w-[90%] md:w-full max-w-xs ml-auto md:ml-0 md:text-right">
                <p className="reveal-text font-body text-base text-neutral-700 leading-relaxed text-justify md:text-right hyphens-auto">
                  the architect of the build. he translates vision into flawless code, ensuring the experience feels as good as it looks.
                </p>
                {/* ✅ REFINED: Added whitespace-nowrap to prevent line breaks on mobile. */}
                <p className="reveal-text font-body text-base text-neutral-800 mt-2 md:hidden whitespace-nowrap">attharv shrivastav</p>
                <div className="reveal-image w-full aspect-[3/4] invisible my-6">
                  <img src={imageAtharv} alt="Atharv Shrivastav" className="w-full h-full object-cover" />
                </div>
                <p className="reveal-text font-body text-base text-neutral-800 hidden md:block md:self-end whitespace-nowrap">attharv shrivastav</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;