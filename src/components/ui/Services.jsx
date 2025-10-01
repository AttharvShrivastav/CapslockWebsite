import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import servicesSVG from '/assets/Services.svg';

const Services = () => {
  const containerRef = useRef(null);
  const servicesTriggerRef = useRef(null);
  const headersRef = useRef([]);

  const serviceItems = ["branding", "ui/ux design", "development", "strategy", "copywriting", "communication design"];
  
  useGSAP(() => {
    const headers = headersRef.current;
    const servicesTrigger = servicesTriggerRef.current;

    const ctx = gsap.context(() => {
      // --- SVG animation logic (unchanged from the last working version) ---
      gsap.set(headers[0], { xPercent: 100 });
      gsap.set(headers[1], { xPercent: -100 });
      gsap.set(headers[2], { xPercent: 100 });
      
      ScrollTrigger.create({
        trigger: servicesTrigger,
        start: "top bottom",
        end: "top 25%",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(headers[0], { xPercent: 100 - self.progress * 100, ease: 'none' });
          gsap.to(headers[1], { xPercent: -100 + self.progress * 100, ease: 'none' });
          gsap.to(headers[2], { xPercent: 100 - self.progress * 100, ease: 'none' });
        },
      });

      let mm = gsap.matchMedia();

      // Desktop Pinning Animation
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: servicesTrigger,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
          onUpdate: (self) => {
            if (self.progress <= 0.5) {
              const yProgress = self.progress / 0.5;
              gsap.set(headers[0], { yPercent: yProgress * 100 });
              gsap.set(headers[2], { yPercent: yProgress * -100 });
            } else {
              gsap.set(headers[0], { yPercent: 100 });
              gsap.set(headers[2], { yPercent: -100 });
              const scaleProgress = (self.progress - 0.5) / 0.5;
              const scale = 1 - scaleProgress * 0.8;
              gsap.set(headers, { scale: scale });
            }
          }
        });
      });
      
      // Mobile/Tablet Pinning Animation
      mm.add("(max-width: 1023px)", () => {
        const mobileTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: servicesTrigger,
            start: "top top",
            end: "+=50%", 
            pin: true,
            scrub: 1,
            pinSpacing: true,
          }
        });
        mobileTimeline
          .to(headers[0], { yPercent: 100 }, 0)
          .to(headers[2], { yPercent: -100 }, 0);
      });

      // ✅ RESTORED: Your original one-by-one, slow text reveal animation.
      const listItems = gsap.utils.toArray(".service-list-item");
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".services-copy-container",
            start: "top center",
            end: "bottom center", // Animate over a longer distance for a slower feel
            scrub: 1,
        }
      });
      listItems.forEach((item) => {
        revealTimeline.to(item, { '--clip-value': '0%', ease: 'none', duration: 1 });
      });

      // FOUC fix
      setTimeout(() => {
        gsap.to(servicesTrigger, { opacity: 1, duration: 0.3 });
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#252525]">
      <div ref={servicesTriggerRef} className="services-container h-screen flex flex-col justify-center items-center overflow-hidden opacity-0">
        {[0, 1, 2].map(i => (
          <div 
            key={i} 
            ref={el => headersRef.current[i] = el}
            className={`services-header w-[90%] ${i === 1 ? 'z-10' : ''}`}
          >
            <img 
              src={servicesSVG} 
              alt="Services" 
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
      
      <div className="services-copy-container relative w-full flex justify-center pb-32 text-center bg-[#252525] text-white -mt-[30vh] md:-mt-[40vh]">
        <div className="max-w-4xl px-6">
            <ul>
              {serviceItems.map((service, index) => (
                <li 
                  key={index} 
                  className="service-list-item animate-text-clip font-body text-2xl md:text-7xl font-regular tracking-tighter leading-tight"
                  data-text={service}
                >
                  {service}
                </li>
              ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;