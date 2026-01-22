// import React, { useState, useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/SplitText';
// import Draggable from 'gsap/Draggable';

// const projects = [
//   { 
//     title: "valleynxt", service: "ui/ux", image: "/assets/display/ValleyNXT_Display.png",
//     description: "A bold new identity and website for a disruptive venture capital firm, designed to reflect ambition, trust, and breakthrough innovation. Capslock delivered a clean digital presence with strong visuals and sharp storytelling, positioning ValleyNXT as a catalyst for India's next-generation startups.",
//   },
//   { 
//     title: "evara", service: "ui/ux", image: "/assets/display/Evara Display.png",
//     description: "A sophisticated website for a premium wedding planner, designed to showcase their services with elegance and ease. Capslock focused on a seamless user journey, highlighting Evara's expertise in curating timeless celebrations.",
//   },
//   { 
//     title: "sultan alnuaimi", service: "ui/ux", image: "/assets/display/Sultan Display.png",
//     description: "A modern website for an AI solutions company, designed to communicate innovation, intelligence, and trust. Capslock created a clean, future-focused digital experience that positions Sultan Alnuaimi as a leader in smart technologies.",
//   },
//   { 
//     title: "emilio beaufort", service: "ui/ux", image: "/assets/display/Emilio Beaufort.png",
//     description: "A professional website for a premium hair extension supplier, designed to showcase product quality and build trust with salons, distributors, and industry partners. Capslock crafted a polished digital presence that reflects reliability and luxury in the B2B space.",
//   },
// ];

// const Projects = () => {
//   const containerRef = useRef(null);
//   const trackRef = useRef(null);
//   const headlineRef = useRef(null);
//   const previewRef = useRef(null);

//   const [hoverData, setHoverData] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useGSAP(() => {
//     if (isVisible) {
//       gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
//     } else {
//       gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'power3.in' });
//     }
//   }, [isVisible]);

//   useGSAP(() => {
//     const track = trackRef.current;

//     // ✅ Use GSAP's matchMedia for responsive animations
//     let mm = gsap.matchMedia();

//     // --- Desktop Animation (Scroll-based) ---
//     mm.add("(min-width: 768px)", () => {
//       const deadSpace = 500;
//       const scrollDistance = () => track.scrollWidth - window.innerWidth;

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: () => `+=${scrollDistance() + deadSpace}`,
//           scrub: 1,
//           pin: true,
//           invalidateOnRefresh: true,
//         }
//       });
//       tl.to(track, { x: () => -scrollDistance(), ease: "none", duration: scrollDistance() });
//       tl.to({}, { duration: deadSpace });
//     });

//     // --- Mobile Animation (Drag-based) ---
//     mm.add("(max-width: 767px)", () => {
//       const draggable = Draggable.create(track, {
//         type: "x",
//         bounds: containerRef.current,
//         inertia: true,
//         edgeResistance: 0.85,
//       });

//       // Cleanup function for this breakpoint
//       return () => {
//         if (draggable && draggable[0]) {
//           draggable[0].kill();
//         }
//       };
//     });

//     // Headline reveal (works on all screen sizes)
//     const splitHeadline = new SplitText(headlineRef.current, { type: "lines" });
//     gsap.from(splitHeadline.lines, {
//       opacity: 0, y: 100, stagger: 0.1, duration: 1, ease: 'power3.out',
//       scrollTrigger: {
//         trigger: headlineRef.current, start: 'top 85%', toggleActions: 'play none none reverse'
//       }
//     });

//     // Cleanup for the entire context
//     return () => mm.revert();
    
//   }, { scope: containerRef });

//   useEffect(() => {
//     const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.6, ease: "power3" });
//     const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.6, ease: "power3" });
//     const moveHandler = (e) => {
//       if (hoveredIndex === projects.length - 1) {
//         xTo(e.clientX - 400 - 20);
//       } else {
//         xTo(e.clientX + 20);
//       }
//       yTo(e.clientY + 20);
//     };
//     if (isVisible) { window.addEventListener("mousemove", moveHandler); }
//     return () => { window.removeEventListener("mousemove", moveHandler); };
//   }, [isVisible, hoveredIndex]);

//   return (
//     <>
//       <section 
//         ref={containerRef} 
//         id="work" 
//         className="h-screen bg-[#D9D9D9] pt-12 text-black flex flex-col justify-center items-start px-5 overflow-hidden"
//       >
//         <div className="w-full font-display h-[60vh] flex items-center">
//           <div ref={trackRef} className="h-full flex items-center gap-6 p-6">
//             {projects.map((project, index) => (
//               <div 
//                 key={index} 
//                 className="project-card relative flex-shrink-0 w-[80vw] md:w-[45vw] h-full group overflow-hidden rounded-2xl"
//                 onMouseEnter={() => { setHoverData(project); setHoveredIndex(index); setIsVisible(true); }}
//                 onMouseLeave={() => { setIsVisible(false); setHoveredIndex(null); }}
//               >
//                 <img 
//                   src={project.image} 
//                   alt={project.title} 
//                   className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105" 
//                 />
//                 <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 via-black/40 to-transparent text-white">
//                   <h3 className="font-display text-2xl">{project.title}</h3>
//                   <p className="font-body text-xs lowercase tracking-widest">{project.service}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="flex-grow w-full flex justify-center items-center">
//           <h2 ref={headlineRef} className="projects-headline font-bold text-center text-[clamp(3.5rem,12vw,12rem)] leading-none lowercase">
//             <span className="block font-display">Portfolio</span>
//           </h2>
//         </div>
//       </section>

//       <div 
//         ref={previewRef} 
//         className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0 scale-0"
//       >
//         {hoverData && (
//           // ✅ Removed the previewImages div
//           <div className="shape-rabbet bg-white text-black p-8 w-[400px] shadow-2xl">
//             <h3 className="font-display text-3xl mb-3">{hoverData.title}</h3>
//             <p className="font-body text-base lowercase text-neutral-600 mb-5">{hoverData.description}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };


import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Draggable from 'gsap/Draggable';

// ✅ Restored Original Projects Array
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
  const detailRef = useRef(null);
  const carouselRef = useRef(null);

  const [hoverData, setHoverData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // --- Drawer Animation ---
  useGSAP(() => {
    if (selectedProject) {
      gsap.to(detailRef.current, { y: 0, duration: 0.8, ease: "expo.out" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(detailRef.current, { y: "100%", duration: 0.6, ease: "expo.inOut" });
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  // --- Carousel Navigation ---
  const navigateCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const scrollAmount = carousel.offsetWidth;
    gsap.to(carousel, {
      scrollLeft: direction === 'next' ? carousel.scrollLeft + scrollAmount : carousel.scrollLeft - scrollAmount,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };

  // ✅ RESTORED: Original Scroll & Drag Logic
  useGSAP(() => {
    const track = trackRef.current;
    let mm = gsap.matchMedia();

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

    mm.add("(max-width: 767px)", () => {
      const draggable = Draggable.create(track, {
        type: "x",
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.85,
      });
      return () => { if (draggable && draggable[0]) draggable[0].kill(); };
    });

    const splitHeadline = new SplitText(headlineRef.current, { type: "lines" });
    gsap.from(splitHeadline.lines, {
      opacity: 0, y: 100, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: headlineRef.current, start: 'top 85%', toggleActions: 'play none none reverse'
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // --- Original Hover Mouse Move ---
  useEffect(() => {
    const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.6, ease: "power3" });
    const moveHandler = (e) => {
      if (hoveredIndex === projects.length - 1) { xTo(e.clientX - 400 - 20); } 
      else { xTo(e.clientX + 20); }
      yTo(e.clientY + 20);
    };
    if (isVisible) { window.addEventListener("mousemove", moveHandler); }
    return () => { window.removeEventListener("mousemove", moveHandler); };
  }, [isVisible, hoveredIndex]);

  return (
    <>
      {/* ✅ RESTORED: Original Section Background and Layout */}
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
                className="project-card cursor-pointer relative flex-shrink-0 w-[80vw] md:w-[45vw] h-full group overflow-hidden rounded-2xl"
                onMouseEnter={() => { setHoverData(project); setHoveredIndex(index); setIsVisible(true); }}
                onMouseLeave={() => { setIsVisible(false); setHoveredIndex(null); }}
                onClick={() => setSelectedProject(project)}
              >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white font-display">
                  <h3 className="text-2xl">{project.title}</h3>
                  <p className="text-xs lowercase tracking-widest">{project.service}</p>
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

      {/* --- PRODUCTION OVERLAY (Reference Layout) --- */}
      <div 
        ref={detailRef}
        className="fixed inset-0 z-[9000] bg-[#D9D9D9] text-black translate-y-full flex flex-col overflow-hidden"
        style={{ height: '100vh', top: '0' }}
      >
        <div className="w-full flex justify-end px-10 pt-10">
          <button onClick={() => setSelectedProject(null)} className="font-display text-sm uppercase border-b border-black">Close</button>
        </div>

        {selectedProject && (
          <div className="flex-grow flex flex-col items-center justify-center px-10 max-w-7xl mx-auto w-full">
            
            {/* Carousel Area */}
            <div className="relative w-full aspect-[21/9] mb-12 group overflow-hidden rounded-sm">
              <div ref={carouselRef} className="w-full h-full flex overflow-x-hidden snap-x snap-mandatory">
                <div className="flex-shrink-0 w-full h-full snap-center bg-neutral-200">
                  <img src={selectedProject.image} className="w-full h-full object-cover" alt="Main" />
                </div>
                {/* Fallback to original image if gallery isn't defined yet */}
                {(selectedProject.gallery || [selectedProject.image]).map((img, i) => (
                  <div key={i} className="flex-shrink-0 w-full h-full snap-center bg-neutral-200">
                    <img src={img} className="w-full h-full object-cover" alt={`Slide ${i}`} />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <button onClick={() => navigateCarousel('prev')} className="pointer-events-auto bg-white/40 hover:bg-white p-2 rounded-full font-display">←</button>
                <button onClick={() => navigateCarousel('next')} className="pointer-events-auto bg-white/40 hover:bg-white p-2 rounded-full font-display">→</button>
              </div>
            </div>

            {/* Description & Links */}
            <div className="w-full flex items-start justify-between font-body">
              <div className="w-2/3">
                <p className="text-lg leading-snug max-w-2xl lowercase">{selectedProject.description}</p>
              </div>
              <div className="w-1/3 flex flex-col items-end gap-2">
                <span className="text-xs uppercase opacity-40 font-display">Links:</span>
                <div className="flex gap-6 uppercase text-sm font-bold">
                  <a href="#" className="border-b border-black">Figma Link .</a>
                  <a href="#" className="border-b border-black">Live Link</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hover Follower */}
      <div ref={previewRef} className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0 scale-0">
        {hoverData && (
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