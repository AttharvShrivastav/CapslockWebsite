// src/hooks/useMousePosition.js
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const useMousePosition = () => {
  useLayoutEffect(() => {
    // Create highly-performant GSAP setters for our CSS variables
    const xTo = gsap.quickTo(document.documentElement, "--cursorX", { duration: 0.4, ease: "power2" });
    const yTo = gsap.quickTo(document.documentElement, "--cursorY", { duration: 0.4, ease: "power2" });

    const handleMouseMove = (e) => {
      // We pass the raw pixel values to GSAP
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Run only once
};

export default useMousePosition;