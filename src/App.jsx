// src/App.jsx
import React, { useState } from 'react';

import MainSite from './components/layout/MainSite';

// All GSAP plugins are now registered here
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';


import PreLoader from './components/ui/Preloader';

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);



function App() {
  const [isLoading, setIsLoading] = useState(true);

  // This check prevents the main site from rendering on the server
  // if you were to use Server-Side Rendering (SSR) in the future.
  const [isClient, setIsClient] = useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && isLoading && <PreLoader setIsLoading={setIsLoading} />}
      {isClient && !isLoading && <MainSite />}
    </>
  );
}

export default App;