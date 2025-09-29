// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/ui/Hero'; // Import our new Hero component
import About from '../components/ui/About';
import Services from '../components/ui/Services';
import Projects from '../components/ui/Projects';
import Testimonials from '../components/ui/Testimonials';
import PreFooterCTA from '../components/ui/PreFooterCTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* We can add the other sections of the site below the hero */}
      <About />
      <Services />
      <Projects />
      <Testimonials />
    </>
  );
};

export default HomePage;