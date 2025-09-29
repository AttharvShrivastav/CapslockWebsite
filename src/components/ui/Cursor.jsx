// src/components/ui/Cursor.jsx
import React, { useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Cursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" });

    const moveHandler = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const enterHandler = () => setIsHovering(true);
    const leaveHandler = () => setIsHovering(false);

    document.addEventListener("magnetic-enter", enterHandler);
    document.addEventListener("magnetic-leave", leaveHandler);

    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("magnetic-enter", enterHandler);
      document.removeEventListener("magnetic-leave", leaveHandler);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor-ball ${isHovering ? 'is-hovering' : ''}`}
    >
      {/* ✅ Swapped back to the pixelated arrow cursor SVG */}
      <svg className="cursor-svg" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H4V4H8V8H12V12H16V16H12V20H8V24H4V28H0V0ZM4 4V8H8V12H12V4H8V0H4V4Z" fill="white"/>
      </svg>
    </div>
  );
};

export default Cursor;