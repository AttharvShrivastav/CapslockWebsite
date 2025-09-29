// src/hooks/useMagnetic.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const useMagnetic = () => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const enterEvent = new CustomEvent('magnetic-enter');
    const leaveEvent = new CustomEvent('magnetic-leave');

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
      });
    };

    const handleMouseEnter = () => {
      document.dispatchEvent(enterEvent);
    };

    const handleMouseLeave = () => {
      document.dispatchEvent(leaveEvent);
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.75)',
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return magneticRef;
};

export default useMagnetic;