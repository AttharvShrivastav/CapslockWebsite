// src/components/ui/HoverPreview.jsx
import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const HoverPreview = () => {
  const containerRef = useRef(null);
  const [projectData, setProjectData] = useState(null);

  useGSAP(() => {
    const xTo = gsap.quickTo(containerRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(containerRef.current, "y", { duration: 0.6, ease: "power3" });

    const moveHandler = (e) => {
      // Offset the position slightly so the cursor isn't directly under the card
      xTo(e.clientX + 20);
      yTo(e.clientY + 20);
    };
    
    const enterHandler = (e) => {
      setProjectData(e.detail);
      gsap.to(containerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
      window.addEventListener("mousemove", moveHandler);
    };

    const leaveHandler = () => {
      gsap.to(containerRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => setProjectData(null),
      });
      window.removeEventListener("mousemove", moveHandler);
    };
    
    document.addEventListener("project-hover-enter", enterHandler);
    document.addEventListener("project-hover-leave", leaveHandler);

    return () => {
      document.removeEventListener("project-hover-enter", enterHandler);
      document.removeEventListener("project-hover-leave", leaveHandler);
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0 scale-0"
    >
      {projectData && (
        // ✅ Using the 'shape-rabbet' class for the background
        <div className="shape-rabbet bg-white text-black p-6 w-[380px] shadow-2xl">
          <h3 className="font-display text-2xl mb-2">{projectData.title}</h3>
          <p className="font-body text-sm text-neutral-600 mb-4">{projectData.description}</p>
          <div className="flex gap-2">
            <div className="w-1/2 h-24 overflow-hidden">
              <img src={projectData.previewImages[0]} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="w-1/2 h-24 overflow-hidden">
              <img src={projectData.previewImages[1]} className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverPreview;