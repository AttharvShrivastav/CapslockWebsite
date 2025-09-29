// src/components/ui/Testimonials.jsx
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "they shipped clean. we grew fast.",
    author: "harshwardhan, valleynxt",
  },
  {
    quote: "minimal talk, maximal output.",
    author: "akshat, aib innovations.",
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);

  // A simple, robust reveal animation for each testimonial card
  useGSAP(() => {
    const items = gsap.utils.toArray('.testimonial-item');
    
    items.forEach(item => {
      gsap.from(item, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="testimonials" 
      className="relative h-screen bg-[#252525] text-white flex justify-center items-center overflow-hidden"
    >
      <div className="w-full h-full max-w-7xl px-6 relative">
        {/* Testimonial 1: Positioned top-left */}
        <div className="testimonial-item absolute top-[25%] left-[10%] max-w-sm">
          <blockquote className="font-body md:text-body tracking-tighter text-white">
            <span className='text-accent'>"</span>{testimonials[0].quote}<span className='text-accent'>"</span>
          </blockquote>
          <p className="mt-4 font-display text-gray-300 text-sm tracking-widest">
            — {testimonials[0].author}
          </p>
        </div>

        {/* Testimonial 2: Positioned bottom-right */}
        <div className="testimonial-item absolute bottom-[25%] right-[10%] max-w-sm text-right">
          <blockquote className="font-body text-body tracking-tighter text-white">
             <span className='text-accent'>"</span>{testimonials[1].quote}<span className='text-accent'>"</span>
          </blockquote>
          <p className="mt-4 font-display text-gray-300 text-sm tracking-widest">
            — {testimonials[1].author}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;