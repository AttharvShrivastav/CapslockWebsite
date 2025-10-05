import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import useLenis from '../../hooks/useLenis';
import Cursor from '../ui/Cursor';
import PatternOverlay from '../layout/PatternOverlay';
import Header from './Header';
import HomePage from '../../pages/HomePage';
import PreFooterCTA from '../ui/PreFooterCTA';
import HoverPreview from '../ui/HoverPreview';

const MainSite = () => {
  const siteContainerRef = useRef(null);
  useLenis();

  // Add a fade-in animation for the whole site after the preloader is gone
  useGSAP(() => {
    gsap.from(siteContainerRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut'
    });
  }, []);

  return (
    <div ref={siteContainerRef}>
      <Cursor />
      <HoverPreview />
      <PatternOverlay />
      <Header />
      <main>
        <HomePage />
      </main>
      <PreFooterCTA />
    </div>
  );
};

export default MainSite;