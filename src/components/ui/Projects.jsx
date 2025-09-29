// src/components/ui/Projects.jsx
import React from  'react';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const projects = [
  { 
    title: "ValleyNXT", service: "Brand Elevation", image: "/assets/display/ValleyNXT_Display.png",
    description: "A complete brand overhaul for a disruptive new player in the tech space, focusing on a bold and memorable identity.",
    previewImages: ["https://picsum.photos/seed/alpha-1/600/400", "https://picsum.photos/seed/alpha-2/600/400"]
  },
  { 
    title: "Evara", service: "Creative Strategy", image: "/assets/display/Evara Display.png",
    description: "Developing a multi-platform creative strategy that increased user engagement by 300% in the first quarter.",
    previewImages: ["https://picsum.photos/seed/beta-1/600/400", "https://picsum.photos/seed/beta-2/600/400"]
  },
  { 
    title: "Sultan's Dine", service: "Digital Revival", image: "/assets/display/Sultan Display.png",
    description: "Revitalizing a legacy brand's digital presence with a modern UI/UX and a cutting-edge development stack.",
    previewImages: ["https://picsum.photos/seed/gamma-1/600/400", "https://picsum.photos/seed/gamma-2/600/400"]
  },
  { 
    title: "Emilio Beaufort", service: "Visual Identity", image: "/assets/display/Emilio Beaufort.png",
    description: "Crafting a unique visual identity system that translated seamlessly from print to digital platforms.",
    previewImages: ["https://picsum.photos/seed/delta-1/600/400", "https://picsum.photos/seed/delta-2/600/400"]
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const headlineRef = useRef(null);
  const previewRef = useRef(null);

  const [hoverData, setHoverData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animate the preview card in and out
  useGSAP(() => {
    if (isVisible) {
      gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'power3.in' });
    }
  }, [isVisible]);

  // Main scroll animations
  useGSAP(() => {
    gsap.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current, start: "top top",
          end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`,
          scrub: 1, pin: true, invalidateOnRefresh: true,
        }
      });
    const splitHeadline = new SplitText(headlineRef.current, { type: "lines" });
      gsap.from(splitHeadline.lines, {
        opacity: 0, y: 100, stagger: 0.1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current, start: 'top 85%', toggleActions: 'play none none reverse'
        }
      });
  }, { scope: containerRef });

  // Mouse follow logic
  useEffect(() => {
    const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.6, ease: "power3" });
    const moveHandler = (e) => { xTo(e.clientX + 20); yTo(e.clientY + 20); };
    if (isVisible) { window.addEventListener("mousemove", moveHandler); }
    return () => { window.removeEventListener("mousemove", moveHandler); };
  }, [isVisible]);

  return (
    <>
      <section 
        ref={containerRef} 
        id="work" 
        className="h-screen bg-[#D9D9D9] text-black flex flex-col justify-center items-start px-5 overflow-hidden"
      >
        <div className="w-full font-display h-[60vh] flex items-center">
          <div ref={trackRef} className="h-full flex items-center gap-6 px-6">
            
            {/* ✅ KEY CHANGE: The project card layout has been updated below */}
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="project-card relative flex-shrink-0 w-[80vw] md:w-[45vw] h-full group overflow-hidden rounded-2xl"
                onMouseEnter={() => { setHoverData(project); setIsVisible(true); }}
                onMouseLeave={() => setIsVisible(false)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105" 
                />
                {/* Text is now absolutely positioned at the bottom */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 via-black/40 to-transparent text-white">
                  <h3 className="font-display text-2xl">{project.title}</h3>
                  <p className="font-body text-xs uppercase tracking-widest">{project.service}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
        <div className="flex-grow w-full flex justify-center items-center">
          <h2 ref={headlineRef} className="projects-headline font-bold text-center text-[clamp(3.5rem,12vw,12rem)] leading-none lowercase">
            <span className="block font-display">Portfolio</span>
          </h2>
        </div>
      </section>

      <div 
        ref={previewRef} 
        className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0 scale-0"
      >
        {hoverData && (
          <div className="shape-rabbet bg-white text-black p-8 w-[400px] shadow-2xl">
            <h3 className="font-display text-3xl mb-3">{hoverData.title}</h3>
            <p className="font-body text-base text-neutral-600 mb-5">{hoverData.description}</p>
            <div className="flex gap-3">
              <div className="w-1/2 h-28 overflow-hidden"><img src={hoverData.previewImages[0]} className="w-full h-full object-cover" alt="" /></div>
              <div className="w-1/2 h-28 overflow-hidden"><img src={hoverData.previewImages[1]} className="w-full h-full object-cover" alt="" /></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;