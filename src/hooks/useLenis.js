// src/hooks/useLenis.js
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis();

    // ✅ KEY CHANGE: The scroll and refresh commands are now in a timeout.
    // This ensures they run AFTER React and GSAP have finished their
    // initial render, preventing the race condition.
    const timer = setTimeout(() => {
      lenis.scrollTo('top', { immediate: true });
      ScrollTrigger.refresh();
    }, 0); // A 0ms delay is all we need to push it to the next cycle.

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(timer); // Clear the timeout on cleanup
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
};

export default useLenis;