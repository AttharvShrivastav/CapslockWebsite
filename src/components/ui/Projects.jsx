import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Draggable from 'gsap/Draggable';

const projects = [
  { 
    title: "valleynxt", service: "ui/ux", image: "/assets/display/ValleyNXT_Display.png",
    description: "A bold new identity and website for a disruptive venture capital firm, designed to reflect ambition, trust, and breakthrough innovation. Capslock delivered a clean digital presence with strong visuals and sharp storytelling, positioning ValleyNXT as a catalyst for India's next-generation startups.",
  },
  { 
    title: "evara", service: "ui/ux", image: "/assets/display/Evara Display.png",
    description: "A sophisticated website for a premium wedding planner, designed to showcase their services with elegance and ease. Capslock focused on a seamless user journey, highlighting Evara's expertise in curating timeless celebrations.",
  },
  { 
    title: "sultan alnuaimi", service: "ui/ux", image: "/assets/display/Sultan Display.png",
    description: "A modern website for an AI solutions company, designed to communicate innovation, intelligence, and trust. Capslock created a clean, future-focused digital experience that positions Sultan Alnuaimi as a leader in smart technologies.",
  },
  { 
    title: "emilio beaufort", service: "ui/ux", image: "/assets/display/Emilio Beaufort.png",
    description: "A professional website for a premium hair extension supplier, designed to showcase product quality and build trust with salons, distributors, and industry partners. Capslock crafted a polished digital presence that reflects reliability and luxury in the B2B space.",
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const headlineRef = useRef(null);
  const previewRef = useRef(null);

  const [hoverData, setHoverData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useGSAP(() => {
    if (isVisible) {
      gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'power3.in' });
    }
  }, [isVisible]);

  useGSAP(() => {
    const track = trackRef.current;

    // ✅ Use GSAP's matchMedia for responsive animations
    let mm = gsap.matchMedia();

    // --- Desktop Animation (Scroll-based) ---
    mm.add("(min-width: 768px)", () => {
      const deadSpace = 500;
      const scrollDistance = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollDistance() + deadSpace}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      });
      tl.to(track, { x: () => -scrollDistance(), ease: "none", duration: scrollDistance() });
      tl.to({}, { duration: deadSpace });
    });

    // --- Mobile Animation (Drag-based) ---
    mm.add("(max-width: 767px)", () => {
      const draggable = Draggable.create(track, {
        type: "x",
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.85,
      });

      // Cleanup function for this breakpoint
      return () => {
        if (draggable && draggable[0]) {
          draggable[0].kill();
        }
      };
    });

    // Headline reveal (works on all screen sizes)
    const splitHeadline = new SplitText(headlineRef.current, { type: "lines" });
    gsap.from(splitHeadline.lines, {
      opacity: 0, y: 100, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: headlineRef.current, start: 'top 85%', toggleActions: 'play none none reverse'
      }
    });

    // Cleanup for the entire context
    return () => mm.revert();
    
  }, { scope: containerRef });

  useEffect(() => {
    const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.6, ease: "power3" });
    const moveHandler = (e) => {
      if (hoveredIndex === projects.length - 1) {
        xTo(e.clientX - 400 - 20);
      } else {
        xTo(e.clientX + 20);
      }
      yTo(e.clientY + 20);
    };
    if (isVisible) { window.addEventListener("mousemove", moveHandler); }
    return () => { window.removeEventListener("mousemove", moveHandler); };
  }, [isVisible, hoveredIndex]);

  return (
    <>
      <section 
        ref={containerRef} 
        id="work" 
        className="h-screen bg-[#D9D9D9] pt-12 text-black flex flex-col justify-center items-start px-5 overflow-hidden"
      >
        <div className="w-full font-display h-[60vh] flex items-center">
          <div ref={trackRef} className="h-full flex items-center gap-6 p-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="project-card relative flex-shrink-0 w-[80vw] md:w-[45vw] h-full group overflow-hidden rounded-2xl"
                onMouseEnter={() => { setHoverData(project); setHoveredIndex(index); setIsVisible(true); }}
                onMouseLeave={() => { setIsVisible(false); setHoveredIndex(null); }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 via-black/40 to-transparent text-white">
                  <h3 className="font-display text-2xl">{project.title}</h3>
                  <p className="font-body text-xs lowercase tracking-widest">{project.service}</p>
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
          // ✅ Removed the previewImages div
          <div className="shape-rabbet bg-white text-black p-8 w-[400px] shadow-2xl">
            <h3 className="font-display text-3xl mb-3">{hoverData.title}</h3>
            <p className="font-body text-base lowercase text-neutral-600 mb-5">{hoverData.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
