// src/components/layout/Footer.jsx
import React from 'react';
// import "../../styles/global.css"

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-10 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p>&copy; 2025 Caps Web — Indore, India</p>
        <div>
          <a href="#top" className="text-sm uppercase tracking-widest">Back to Top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;